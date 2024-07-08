import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { InvalidNameLengthError } from '../errors/invalid-name-length'
import { InvalidEmail } from '../errors/invalid-email'
import { InvalidBirthDate } from '../errors/invalid-birth-date'

export type CustomerProps = {
  name: string
  birthDate: Date
  email: string
  password: string
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

  touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<CustomerProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    const customer = new Customer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    customer.validate()

    return customer
  }

  validate() {
    if (this.name.length > 255) {
      throw new InvalidNameLengthError(
        `name length is bigger to 255 characters`,
      )
    }

    if (`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$`.match(this.email)) {
      throw new InvalidEmail()
    }

    if (this.birthDate > new Date()) {
      throw new InvalidBirthDate()
    }
  }
}
