import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type CustomerProps = {
  name: string
  birthDate: Date
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date | null | undefined
}

export class Customer extends AggregateRoot<CustomerProps> {
  static create(
    props: Optional<CustomerProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    return new Customer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }

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

  get password() {
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
}