import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customers-repository'
import { CreateCustomerUseCase } from './create-customer'

describe('Create customer use case', () => {
  let customersRepository: InMemoryCustomersRepository
  let sut: CreateCustomerUseCase

  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new CreateCustomerUseCase(customersRepository)
  })

  it('should be able to create a new customer', async () => {
    const { isLeft, isRight, value } = await sut.execute({
      name: 'John Doe',
      birthDate: new Date(1998, 5, 11),
      email: 'John Doe@example.com',
      password: 'password',
    })

    const customerCreated = customersRepository.customers[0]

    expect(isLeft()).toBe(false)
    expect(isRight()).toBe(true)
    expect(customersRepository.customers).toHaveLength(1)
    expect(customerCreated.id).toEqual(value?.customer.id)
    expect(customerCreated.email).toEqual(value?.customer.email)
  })
})
