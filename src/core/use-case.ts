export abstract class UseCase<IN, OUT> {
  abstract execute(data: IN): OUT
}
