import { EntityError } from '@/core/errors/entity-error'

export class InvalidEmailError extends Error implements EntityError {
  constructor() {
    super('Invalid e-mail')
  }
}
