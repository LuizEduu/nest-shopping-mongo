import { Customer } from '@/domain/shopping/enterprise/entities/customer'

export class MongooseCustomersMapper {
  static toMongoose(customer: Customer) {
    return {
      name: customer.name,
      email: customer.email,
      birthDate: customer.birthDate,
      password: customer.password,
      createdAt: customer.createdAt,
    }
  }
}
