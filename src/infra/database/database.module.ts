import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CustomerSchema, Customer } from './mongoose/models/customer-schema'
import { CustomersRepository } from '@/domain/shopping/application/repositories/customers-repository'
import { MongooseCustomersRepository } from './mongoose/repositories/mongoose-customer-repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: CustomersRepository,
      useClass: MongooseCustomersRepository,
    },
  ],

  exports: [CustomersRepository],
})
export class DatabaseModule {}
