import { Customer } from '@/domain/shopping/enterprise/entities/customer'

export class HttpCustomerPresenter {
  static toHTTP(customer: Customer) {
    return {
      id: customer.id.toString(),
      name: customer.name,
      birthDate: customer.birthDate,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }
  }
}
