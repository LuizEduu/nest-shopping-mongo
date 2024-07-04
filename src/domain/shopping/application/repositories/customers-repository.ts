import { PaginationParams } from '@/core/repositories/pagination-params'
import { Customer } from '../../enterprise/entities/customer'
import { CustomerNoPassword } from '../../enterprise/entities/value-objects/customer-no-password'

export abstract class CustomersRepository {
  abstract create(customer: Customer): Promise<void>
  abstract findAll(params: PaginationParams): Promise<CustomerNoPassword[]>
}
