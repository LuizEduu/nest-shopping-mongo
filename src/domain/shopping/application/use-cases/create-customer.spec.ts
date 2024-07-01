import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customers-repository'
import { CreateCustomerUseCase } from './create-customer'
import { makeCustomer } from 'test/factories/make-customer'

describe('Create customer use case', () => {
  let customersRepository: InMemoryCustomersRepository
  let sut: CreateCustomerUseCase

  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new CreateCustomerUseCase(customersRepository)
  })

  it('should be able to create a new customer', async () => {
    const customer = makeCustomer({
      name: 'John Doe',
      email: 'JohnDoe@example.com',
    })

    await customersRepository.create(customer)

    await sut.execute({
      name: customer.name,
      birthDate: customer.birthDate,
      email: customer.email,
      password: customer.password,
    })

    const customerCreated = customersRepository.customers[0]

    expect(customersRepository.customers).toHaveLength(1)
    expect(customerCreated.id).toEqual(customer.email)
    expect(customerCreated.email).toEqual(customer.email)
  })
})
