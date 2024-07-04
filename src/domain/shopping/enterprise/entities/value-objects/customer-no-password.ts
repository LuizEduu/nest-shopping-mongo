import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-objects'

export type CustomerNoPasswordProps = {
  id: UniqueEntityID
  name: string
  email: string
  birthDate: Date
  createdAt: Date
}

export class CustomerNoPassword extends ValueObject<CustomerNoPasswordProps> {
  get id() {
    return this.props.id
  }

  get email() {
    return this.props.email
  }

  get birthDate() {
    return this.props.birthDate
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: CustomerNoPasswordProps) {
    return new CustomerNoPassword(props)
  }
}
