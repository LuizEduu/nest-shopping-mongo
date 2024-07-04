import { Either, right } from '@/core/either'
import { UseCase } from '@/core/use-case'
import { Injectable } from '@nestjs/common'
import { CustomersRepository } from '../repositories/customers-repository'
import { CustomerNoPassword } from '../../enterprise/entities/value-objects/customer-no-password'

type FetchCustomersRequest = {
  page: number
  pageSize: number
}

type FetchCustomersResponse = Either<
  null,
  {
    customers: CustomerNoPassword[]
  }
>

@Injectable()
export class FetchCustomersUseCase
  implements UseCase<FetchCustomersRequest, Promise<FetchCustomersResponse>>
{
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    page,
    pageSize,
  }: FetchCustomersRequest): Promise<FetchCustomersResponse> {
    const customers = await this.customersRepository.findAll({
      page,
      pageSize,
    })

    return right({
      customers,
    })
  }
}
