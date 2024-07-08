export interface ValidationHandler {
  add(error: Error): void
  getErrors(): Error[]
  hasError(): boolean
}
