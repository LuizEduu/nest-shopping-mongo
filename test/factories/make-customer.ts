import {
  Customer,
  CustomerProps,
} from '@/domain/shopping/enterprise/entities/customer'

import { faker } from '@faker-js/faker'

export function makeCustomer(overide: Partial<CustomerProps>): Customer {
  return Customer.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    birthDate: faker.date.birthdate(),
    password: faker.internet.password(),
    ...overide,
  })
}
