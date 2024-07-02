import { Module } from '@nestjs/common'
import { CreateCustomerController } from './controllers/create-customer.controller'
import { CreateCustomerUseCase } from '@/domain/shopping/application/use-cases/create-customer'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateCustomerController],
  providers: [CreateCustomerUseCase],
})
export class HttpModule {}
