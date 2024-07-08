import { ValidationHandler } from '@/core/validation/validation-handler'

export class Notification implements ValidationHandler {
  private readonly errors: Error[]

  constructor(errors: Error[]) {
    this.errors = errors
  }

  getErrors(): Error[] {
    return this.errors
  }

  add(err: Error): void {
    this.errors.push(err)
  }

  hasError(): boolean {
    return !!this.errors.length
  }

  static create(err?: Error): Notification {
    return err
      ? new Notification(new Array<Error>(err))
      : new Notification(new Array<Error>())
  }
}
