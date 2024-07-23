export abstract class Inviter {
  abstract send(email: string): Promise<void>
}
