import { InMemoryCustomersRepository } from 'test/repositories/in-memory-customers-repository'
import { CreateCustomerUseCase } from './create-customer'
import {
  InvalidBirthDateError,
  InvalidEmailError,
  InvalidNameLengthError,
} from '../../enterprise/errors'

describe('Create customer use case', () => {
  let customersRepository: InMemoryCustomersRepository
  let sut: CreateCustomerUseCase

  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository()
    sut = new CreateCustomerUseCase(customersRepository)
  })

  it('should be able to create a new customer', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      birthDate: new Date(1998, 5, 11),
      email: 'JohnDoe@gmail.com.br',
      password: 'password',
    })

    const customerCreated = customersRepository.customers[0]

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(customersRepository.customers).toHaveLength(1)
      expect(customerCreated.id).toEqual(result.value.customer.id)
      expect(customerCreated.email).toEqual(result.value.customer.email)
    }
  })

  it('should not be able to create a new customer when name is invalid', async () => {
    const result = await sut.execute({
      name: 'a'.repeat(256),
      birthDate: new Date(1998, 5, 11),
      email: 'John Doe@example.com',
      password: 'password',
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
    expect(customersRepository.customers).toHaveLength(0)
  })

  it('should not be able to create a new customer when email is invalid', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'invalid-email',
      birthDate: new Date(1998, 5, 11),
      password: 'password',
    })

    expect(result.isRight()).toBe(false)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toMatchObject(
      expect.objectContaining({
        errors: expect.arrayContaining([new InvalidEmailError()]),
      }),
    )
    expect(customersRepository.customers).toHaveLength(0)
  })

  it('should not be able to create a new customer when birthDate is invalid', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      birthDate: new Date(2025, 2, 5),
      password: 'password',
    })

    expect(result.isRight()).toBe(false)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toMatchObject(
      expect.objectContaining({
        errors: expect.arrayContaining([new InvalidBirthDateError()]),
      }),
    )
    expect(customersRepository.customers).toHaveLength(0)
  })

  it('should not be able to create a new customer when all fields is invalid', async () => {
    const result = await sut.execute({
      name: 'John Doe'.repeat(255),
      email: 'johndoe',
      birthDate: new Date(2025, 2, 5),
      password: 'password',
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
    expect(customersRepository.customers).toHaveLength(0)
  })
})
