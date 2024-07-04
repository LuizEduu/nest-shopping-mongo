import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customers-repository'
import { FetchCustomersUseCase } from './fetch-customers'
import { makeCustomer } from 'test/factories/make-customer'

describe('Fetch customers use case', () => {
  let customersRepository: InMemoryCustomersRepository
  let sut: FetchCustomersUseCase

  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new FetchCustomersUseCase(customersRepository)
  })

  it('shoud be able to return customers list with default params', async () => {
    for (let i = 0; i < 10; i++) {
      const customer = makeCustomer()
      customersRepository.customers.push(customer)
    }

    const result = await sut.execute({
      page: 1,
      pageSize: 10,
    })

    expect(result.value?.customers.length).toBe(10)
  })

  it('shoud be able to paginate customers list', async () => {
    for (let i = 0; i < 13; i++) {
      const customer = makeCustomer()
      customersRepository.customers.push(customer)
    }

    const result = await sut.execute({
      page: 2,
      pageSize: 10,
    })

    expect(result.value?.customers.length).toBe(3)
  })
})
