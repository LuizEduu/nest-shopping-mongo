import { CustomersRepository } from '@/domain/shopping/application/repositories/customers-repository'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Customer as CustomerMongoose } from '../models/customer-schema'
import { Customer } from '@/domain/shopping/enterprise/entities/customer'
import { Injectable } from '@nestjs/common'
import { MongooseCustomersMapper } from '../mappers/mongoose-customers-mapper'

@Injectable()
export class MongooseCustomersRepository implements CustomersRepository {
  constructor(
    @InjectModel(CustomerMongoose.name)
    private CustomersModel: Model<CustomerMongoose>,
  ) {}

  async create(customer: Customer): Promise<void> {
    const customerMongoose = MongooseCustomersMapper.toMongoose(customer)

    const model = new this.CustomersModel(customerMongoose)

    await model.save()
  }
}
