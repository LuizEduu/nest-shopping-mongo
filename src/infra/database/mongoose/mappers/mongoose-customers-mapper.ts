import { Customer } from '@/domain/shopping/enterprise/entities/customer'
import { Customer as CustomerMongoose } from '../models/customer-schema'
import { Document } from 'mongoose'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CustomerNoPassword } from '@/domain/shopping/enterprise/entities/value-objects/customer-no-password'

export class MongooseCustomersMapper {
  static toMongoose(customer: Customer) {
    return {
      id: customer.id.toString(),
      name: customer.name,
      email: customer.email,
      birthDate: customer.birthDate,
      password: customer.password,
      createdAt: customer.createdAt,
    }
  }

  static toCustomerNoPassword(
    raw: Document<unknown, unknown, CustomerMongoose> & CustomerMongoose,
  ): CustomerNoPassword {
    return CustomerNoPassword.create({
      id: new UniqueEntityID(raw.id),
      name: raw.name,
      email: raw.email,
      birthDate: raw.birthDate,
      createdAt: raw.createdAt,
    })
  }

  static toDomain(
    raw: Document<unknown, unknown, CustomerMongoose> & CustomerMongoose,
  ): Customer {
    return Customer.create(
      {
        name: raw.name,
        email: raw.email,
        birthDate: raw.birthDate,
        createdAt: raw.createdAt,
        password: raw.password,
      },
      new UniqueEntityID(raw._id.toString()),
    )
  }
}
