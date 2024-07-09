import { Customer } from '@/domain/shopping/enterprise/entities/customer'
import { CustomerNoPassword } from '@/domain/shopping/enterprise/entities/value-objects/customer-no-password'

export class HttpCustomerPresenter {
  static toHTTP(customer: Customer) {
    return {
      id: customer.id.toString(),
      name: customer.name,
      email: customer.email,
      birthDate: customer.birthDate,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }
  }

  static customerNoPasswordToHTTP(customer: CustomerNoPassword) {
    return {
      id: customer.id.toString(),
      email: customer.email,
      birthDate: customer.birthDate,
      createdAt: customer.createdAt,
    }
  }
}
