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

  async findOne(id: string): Promise<Customer | null> {
    const customer = this.customers.find(
      (customer) => customer.id.toString() === id,
    )

    return customer ?? null
  }

  async save(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex(
      (c) => c.id.toString() === customer.id.toString(),
    )

    this.customers.splice(customerIndex, 1)

    this.customers[customerIndex] = customer
  }
}
