import { Either, right } from '@/core/either'
import { Customer } from '../../enterprise/entities/customer'
import { CustomersRepository } from '../repositories/customers-repository'

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

export class CreateCustomerUseCase {
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