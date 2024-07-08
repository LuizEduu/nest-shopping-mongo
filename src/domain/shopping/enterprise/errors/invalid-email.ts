import { EntityError } from '@/core/errors/entity-error'

export class InvalidEmail extends Error implements EntityError {
  constructor() {
    super('Invalid e-mail')
  }
}
