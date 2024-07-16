import { UseCase } from '@/core/use-case'
import { CustomersRepository } from '../repositories/customers-repository'
import { Either, left, right } from '@/core/either'
import { CustomerNotFound } from './errors/customer-not-found'
import { Injectable } from '@nestjs/common'
import { Notification } from '../../enterprise/entities/validation/handler/notification'

type UpdateCustomerRequest = {
  id: string
  name: string
  email: string
  birthDate: Date
}

type UpdateCustomerResponse = Either<CustomerNotFound, null>

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
    const customer = await this.customersRepository.findOne(id)

    if (!customer) {
      return left(new CustomerNotFound())
    }

    customer.name = name
    customer.email = email
    customer.birthDate = birthDate
    customer.touch()

    const notification = Notification.create()

    customer.validate(notification)

    await this.customersRepository.save(customer)

    return right(null)
  }
}
