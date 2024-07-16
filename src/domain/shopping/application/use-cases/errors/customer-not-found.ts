import { UseCaseError } from '@/core/errors/use-case-error'

export class CustomerNotFound extends Error implements UseCaseError {
  constructor() {
    super('Customer not found.')
  }
}
