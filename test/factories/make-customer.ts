import {
  Customer,
  CustomerProps,
} from '@/domain/shopping/enterprise/entities/customer'

import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Customer as CustomerMongoose } from '@/infra/database/mongoose/models/customer-schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MongooseCustomersMapper } from '@/infra/database/mongoose/mappers/mongoose-customers-mapper'

export function makeCustomer(overide: Partial<CustomerProps> = {}): Customer {
  return Customer.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    birthDate: faker.date.birthdate(),
    password: faker.internet.password(),
    ...overide,
  })
}

@Injectable()
export class CustomerFactory {
  constructor(
    @InjectModel(CustomerMongoose.name)
    private CustomersModel: Model<CustomerMongoose>,
  ) {}

  async makeMongooseCustomer(
    data: Partial<CustomerProps> = {},
  ): Promise<Customer> {
    const customer = makeCustomer(data)

    const customerMongoose = MongooseCustomersMapper.toMongoose(customer)

    const model = new this.CustomersModel({
      ...customerMongoose,
      _id: customerMongoose.id,
    })

    await model.save()

    return customer
  }
}
