import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { ValidationHandler } from '@/core/validation/validation-handler'
import { CustomerValidator } from './validation/customer-validator'

enum status {
  active = 'active',
  inValidation = 'inValidation',
  deactive = 'deactive',
}

export type CustomerProps = {
  name: string
  birthDate: Date
  email: string
  status: status
  password: string | null
  createdAt: Date
  updatedAt?: Date | null | undefined
}

export class Customer extends AggregateRoot<CustomerProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get birthDate() {
    return this.props.birthDate
  }

  set birthDate(birthDate: Date) {
    this.props.birthDate = birthDate
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get status() {
    return this.props.status
  }

  get password(): string | null {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get createdAt() {
    return this.props.createdAt
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }

  activate() {
    if (this.props.status === status.inValidation) {
      this.props.status = status.active
    }
  }

  static create(
    props: Optional<
      CustomerProps,
      'createdAt' | 'updatedAt' | 'password' | 'status'
    >,
    id?: UniqueEntityID,
  ) {
    const customer = new Customer(
      {
        ...props,
        password: props.password ?? null,
        createdAt: props.createdAt ?? new Date(),
        status: status.inValidation,
      },
      id,
    )

    return customer
  }

  validate(handler: ValidationHandler) {
    new CustomerValidator(this, handler).validate()
  }
}
