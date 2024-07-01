import { Customer } from '../../enterprise/entities/customer'

export abstract class CustomersRepository {
  abstract create(customer: Customer): Promise<void>
}
