import { Module } from '@nestjs/common'
import { CreateCustomerController } from './controllers/create-customer.controller'
import { CreateCustomerUseCase } from '@/domain/shopping/application/use-cases/create-customer'
import { DatabaseModule } from '../database/database.module'
import { FetchCustomersController } from './controllers/fetch-customers.controller'
import { FetchCustomersUseCase } from '@/domain/shopping/application/use-cases/fetch-customers'
import { UpdateCustomerController } from './controllers/update-customer.controller'
import { UpdateCustomerUseCase } from '@/domain/shopping/application/use-cases/update-customer'
import { EmailModule } from '../email/email.module'

@Module({
  imports: [DatabaseModule, EmailModule],
  controllers: [
    CreateCustomerController,
    FetchCustomersController,
    UpdateCustomerController,
  ],
  providers: [
    CreateCustomerUseCase,
    FetchCustomersUseCase,
    UpdateCustomerUseCase,
  ],
})
export class HttpModule {}
