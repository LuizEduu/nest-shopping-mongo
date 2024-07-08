import { EntityError } from '@/core/errors/entity-error'

export class InvalidBirthDate extends Error implements EntityError {
  constructor() {
    super('date of birth cannot be greater than the current date')
  }
}
