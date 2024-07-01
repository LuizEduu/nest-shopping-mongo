import { CustomersRepository } from '@/domain/shopping/application/repositories/customers-repository'
import { Customer } from '@/domain/shopping/enterprise/entities/customer'

export class InMemoryCustomersRepository implements CustomersRepository {
  public customers: Customer[]

  constructor() {
    this.customers = []
  }

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer)
  }
}
