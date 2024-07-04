import { Module } from '@nestjs/common'
import { CreateCustomerController } from './controllers/create-customer.controller'
import { CreateCustomerUseCase } from '@/domain/shopping/application/use-cases/create-customer'
import { DatabaseModule } from '../database/database.module'
import { FetchCustomersController } from './controllers/fetch-customers.controller'
import { FetchCustomersUseCase } from '@/domain/shopping/application/use-cases/fetch-customers'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateCustomerController, FetchCustomersController],
  providers: [CreateCustomerUseCase, FetchCustomersUseCase],
})
export class HttpModule {}
