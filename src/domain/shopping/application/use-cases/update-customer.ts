import { UseCase } from '@/core/use-case'
import { CustomersRepository } from '../repositories/customers-repository'
import { Either, left, right } from '@/core/either'
import { CustomerNotFound } from './errors/customer-not-found'
import { Injectable } from '@nestjs/common'
import { Notification } from '../../enterprise/entities/validation/handler/notification'
import { Customer } from '../../enterprise/entities/customer'

type UpdateCustomerRequest = {
  id: string
  name: string
  email: string
  birthDate: Date
}

type UpdateCustomerResponse = Either<Notification, null>

@Injectable()
export class UpdateCustomerUseCase
  implements UseCase<UpdateCustomerRequest, Promise<UpdateCustomerResponse>>
{
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute({
    id,
    name,
    email,
    birthDate,
  }: UpdateCustomerRequest): Promise<UpdateCustomerResponse> {
    const customerNotExists = await this.customersRepository.findOne(id)

    const notification = Notification.create()

    if (!customerNotExists) {
      notification.add(new CustomerNotFound())
      return left(notification)
    }

    const customer = Customer.create(
      {
        name,
        birthDate,
        email,
      },
      customerNotExists?.id,
    )
    customer.touch()

    customer.validate(notification)

    if (notification.hasError()) {
      return left(notification)
    }

    await this.customersRepository.save(customer)

    return right(null)
  }
}
