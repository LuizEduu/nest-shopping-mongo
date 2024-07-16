import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customers-repository'
import {
  InvalidBirthDateError,
  InvalidEmailError,
  InvalidNameLengthError,
} from '../../enterprise/errors'
import { UpdateCustomerUseCase } from './update-customer'
import { makeCustomer } from 'test/factories/make-customer'

describe('Update customer use case', () => {
  let customersRepository: InMemoryCustomersRepository
  let sut: UpdateCustomerUseCase

  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new UpdateCustomerUseCase(customersRepository)
  })

  it('should be able to update a customer', async () => {
    const customer = makeCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
      birthDate: new Date(2001, 1, 10),
    })

    customersRepository.customers.push(customer)

    const updatePayload = {
      id: customer.id.toString(),
      name: 'John',
      birthDate: new Date(1998, 5, 11),
      email: 'JohnDoeupdate@gmail.com.br',
    }

    const result = await sut.execute(updatePayload)

    const customerUpdated = customersRepository.customers[0]

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    expect(customerUpdated.name).toEqual(updatePayload.name)
    expect(customerUpdated.email).toEqual(updatePayload.email)
    expect(customerUpdated.birthDate.getTime()).toBeLessThan(
      customer.birthDate.getTime(),
    )
  })

  it.only('should not be able to update a new customer when name is invalid', async () => {
    const customer = makeCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
      birthDate: new Date(2001, 1, 10),
    })

    customersRepository.customers.push(customer)

    const result = await sut.execute({
      id: customer.id.toString(),
      name: 'a'.repeat(256),
      birthDate: new Date(1998, 5, 11),
      email: 'John Doe@example.com',
    })

    expect(result.isRight()).toBe(false)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toMatchObject(
      expect.objectContaining({
        errors: expect.arrayContaining([
          new InvalidNameLengthError('name length is bigger to 255 characters'),
        ]),
      }),
    )
  })

  it('should not be able to create a new customer when email is invalid', async () => {
    const customer = makeCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
      birthDate: new Date(2001, 1, 10),
    })

    customersRepository.customers.push(customer)

    const result = await sut.execute({
      id: customer.id.toString(),
      name: 'John Doe',
      email: 'invalid-email',
      birthDate: new Date(1998, 5, 11),
    })

    expect(result.isRight()).toBe(false)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toMatchObject(
      expect.objectContaining({
        errors: expect.arrayContaining([new InvalidEmailError()]),
      }),
    )
  })

  it('should not be able to create a new customer when birthDate is invalid', async () => {
    const customer = makeCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
      birthDate: new Date(2001, 1, 10),
    })

    customersRepository.customers.push(customer)

    const result = await sut.execute({
      id: customer.id.toString(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      birthDate: new Date(2025, 2, 5),
    })

    expect(result.isRight()).toBe(false)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toMatchObject(
      expect.objectContaining({
        errors: expect.arrayContaining([new InvalidBirthDateError()]),
      }),
    )
  })

  it('should not be able to create a new customer when all fields is invalid', async () => {
    const customer = makeCustomer({
      name: 'John Doe',
      email: 'johndoe@example.com',
      birthDate: new Date(2001, 1, 10),
    })

    customersRepository.customers.push(customer)

    const result = await sut.execute({
      id: customer.id.toString(),
      name: 'John Doe'.repeat(255),
      email: 'johndoe',
      birthDate: new Date(2025, 2, 5),
    })

    expect(result.isRight()).toBe(false)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toMatchObject(
      expect.objectContaining({
        errors: expect.arrayContaining([
          new InvalidNameLengthError('name length is bigger to 255 characters'),
          new InvalidEmailError(),
          new InvalidBirthDateError(),
        ]),
      }),
    )
  })
})
