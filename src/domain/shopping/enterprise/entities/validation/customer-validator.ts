import { Validator } from '@/core/validation/validator'
import { Customer } from '../customer'
import { ValidationHandler } from '@/core/validation/validation-handler'
import {
  InvalidNameLengthError,
  InvalidEmailError,
  InvalidBirthDateError,
} from '../../errors'

export class CustomerValidator extends Validator {
  private readonly customer: Customer

  constructor(customer: Customer, handler: ValidationHandler) {
    super(handler)
    this.customer = customer
  }

  validate(): void {
    if (this.customer.name.length > 255) {
      this.validationHandler().add(
        new InvalidNameLengthError(`name length is bigger to 255 characters`),
      )
    }

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(
        this.customer.email,
      )
    ) {
      this.validationHandler().add(new InvalidEmailError())
    }

    if (this.customer.birthDate > new Date()) {
      this.validationHandler().add(new InvalidBirthDateError())
    }
  }
}
