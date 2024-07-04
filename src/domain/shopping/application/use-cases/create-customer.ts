import { Either, right } from '@/core/either'
import { Customer } from '../../enterprise/entities/customer'
import { CustomersRepository } from '../repositories/customers-repository'
import { Injectable } from '@nestjs/common'
import { UseCase } from '@/core/use-case'

type createCustomerRequest = {
  name: string
  birthDate: Date
  email: string
  password: string
}

type createCustomerResponse = Either<
  null,
  {
    customer: Customer
  }
>
@Injectable()
export class CreateCustomerUseCase
  implements UseCase<createCustomerRequest, Promise<createCustomerResponse>>
{
  constructor(private customersRepository: CustomersRepository) {}

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

    await this.customersRepository.create(customer)

    return right({
      customer,
    })
  }
}
