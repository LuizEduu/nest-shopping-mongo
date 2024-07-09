import { FetchCustomersUseCase } from '@/domain/shopping/application/use-cases/fetch-customers'
import { Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { HttpCustomerPresenter } from '../presenters/http-customer-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const pageSizeQueryParamSchema = z.string().transform(Number)

type PageSizeQueryParamSchema = z.infer<typeof pageSizeQueryParamSchema>

@Controller('/customers')
export class FetchCustomersController {
  constructor(private useCase: FetchCustomersUseCase) {}

  @Get()
  async handle(
    @Query('page', new ZodValidationPipe(pageQueryParamSchema))
    page: PageQueryParamSchema,
    @Query('pageSize', new ZodValidationPipe(pageSizeQueryParamSchema))
    pageSize: PageSizeQueryParamSchema,
  ) {
    const result = await this.useCase.execute({
      page,
      pageSize,
    })

    return result.value?.customers.map(
      HttpCustomerPresenter.customerNoPasswordToHTTP,
    )
  }
}
