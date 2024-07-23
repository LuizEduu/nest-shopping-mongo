import { Either, left, right } from '@/core/either'
import { Customer } from '../../enterprise/entities/customer'
import { CustomersRepository } from '../repositories/customers-repository'
import { Injectable } from '@nestjs/common'
import { UseCase } from '@/core/use-case'
import { Notification } from '../../enterprise/entities/validation/handler/notification'
import { Inviter } from '../email/inviter'

type createCustomerRequest = {
  name: string
  birthDate: Date
  email: string
  password: string
}

type createCustomerResponse = Either<
  Notification,
  {
    customer: Customer
  }
>
@Injectable()
export class CreateCustomerUseCase
  implements UseCase<createCustomerRequest, Promise<createCustomerResponse>>
{
  constructor(
    private customersRepository: CustomersRepository,
    private invite: Inviter,
  ) {}

  async execute({
    name,
    birthDate,
    email,
    password,
  }: createCustomerRequest): Promise<createCustomerResponse> {
    const customer = Customer.create({
      name,
      birthDate,
      email,
      password,
    })

    const notification = Notification.create()

    customer.validate(notification)

    if (notification.hasError()) {
      return left(notification)
    }

    await this.customersRepository.create(customer)

    await this.invite.send(customer.email)

    return right({
      customer,
    })
  }
}
