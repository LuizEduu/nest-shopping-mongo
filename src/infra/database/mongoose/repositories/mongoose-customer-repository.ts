import { CustomersRepository } from '@/domain/shopping/application/repositories/customers-repository'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Customer as CustomerMongoose } from '../models/customer-schema'
import { Customer } from '@/domain/shopping/enterprise/entities/customer'
import { Injectable } from '@nestjs/common'
import { MongooseCustomersMapper } from '../mappers/mongoose-customers-mapper'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { CustomerNoPassword } from '@/domain/shopping/enterprise/entities/value-objects/customer-no-password'

@Injectable()
export class MongooseCustomersRepository implements CustomersRepository {
  constructor(
    @InjectModel(CustomerMongoose.name)
    private CustomersModel: Model<CustomerMongoose>,
  ) {}

  async create(customer: Customer): Promise<void> {
    const customerMongoose = MongooseCustomersMapper.toMongoose(customer)

    const model = new this.CustomersModel({
      ...customerMongoose,
      _id: customerMongoose.id,
    })

    await model.save()
  }

  async findAll({
    page,
    pageSize,
  }: PaginationParams): Promise<CustomerNoPassword[]> {
    const skip = (page - 1) * pageSize

    const customers = await this.CustomersModel.find()
      .skip(skip)
      .limit(pageSize)

    return customers.map(MongooseCustomersMapper.toCustomerNoPassword)
  }

  async findOne(id: string): Promise<Customer | null> {
    const customer = await this.CustomersModel.findById(id)

    if (!customer) {
      return null
    }

    return MongooseCustomersMapper.toDomain(customer)
  }

  async save(customer: Customer): Promise<void> {
    const customerMongoose = MongooseCustomersMapper.toMongoose(customer)

    await this.CustomersModel.findByIdAndUpdate(customerMongoose.id, {
      ...customerMongoose,
    })
  }
}
