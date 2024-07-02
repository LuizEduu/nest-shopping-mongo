import { CreateCustomerUseCase } from '@/domain/shopping/application/use-cases/create-customer'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { HttpCustomerPresenter } from '../presenters/http-customer-presenter'

const createCustomerSchema = z.object({
  name: z.string(),
  birthDate: z.date(),
  email: z.string().email(),
  password: z.string(),
})

type CreateCustomerBodySchema = z.infer<typeof createCustomerSchema>

@Controller('/customers')
export class CreateCustomerController {
  constructor(private useCase: CreateCustomerUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreateCustomerBodySchema) {
    const { name, email, birthDate, password } = body

    const result = await this.useCase.execute({
      name,
      email,
      birthDate,
      password,
    })

    if (result.isLeft()) {
      throw new BadRequestException('error to create a customer')
    }

    return HttpCustomerPresenter.toHTTP(result.value.customer)
  }
}
