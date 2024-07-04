import { PaginationParams } from '@/core/repositories/pagination-params'
import { CustomersRepository } from '@/domain/shopping/application/repositories/customers-repository'
import { Customer } from '@/domain/shopping/enterprise/entities/customer'
import { CustomerNoPassword } from '@/domain/shopping/enterprise/entities/value-objects/customer-no-password'

export class InMemoryCustomersRepository implements CustomersRepository {
  public customers: Customer[]

  constructor() {
    this.customers = []
  }

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer)
  }

  async findAll({
    page,
    pageSize,
  }: PaginationParams): Promise<CustomerNoPassword[]> {
    return this.customers
      .map((customer) =>
        CustomerNoPassword.create({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          birthDate: customer.birthDate,
          createdAt: customer.createdAt,
        }),
      )
      .slice((page - 1) * pageSize, page * pageSize)
  }
}
