import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { UpdateCustomerUseCase } from '@/domain/shopping/application/use-cases/update-customer'

const updateCustomerParamsSchema = z.object({
  id: z.string(),
})

const updateCustomerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  birthDate: z
    .string()
    .date()
    .transform((value) => new Date(value)),
})

type UpdateCustomerParamsSchema = z.infer<typeof updateCustomerParamsSchema>
type UpdateCustomerBodySchema = z.infer<typeof updateCustomerBodySchema>

@Controller('/customers')
export class UpdateCustomerController {
  constructor(private useCase: UpdateCustomerUseCase) {}

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Param(new ZodValidationPipe(updateCustomerParamsSchema))
    { id }: UpdateCustomerParamsSchema,
    @Body(new ZodValidationPipe(updateCustomerBodySchema))
    { name, email, birthDate }: UpdateCustomerBodySchema,
  ) {
    const result = await this.useCase.execute({
      id,
      name,
      email,
      birthDate,
    })

    if (result.isLeft()) {
      throw new BadRequestException('error to create a customer')
    }
  }
}
