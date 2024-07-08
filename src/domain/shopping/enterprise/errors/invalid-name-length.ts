import { EntityError } from '@/core/errors/entity-error'

export class InvalidNameLengthError extends Error implements EntityError {
  constructor(message: string) {
    super(message)
  }
}
