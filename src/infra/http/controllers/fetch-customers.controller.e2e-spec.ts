import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import {
  Customer,
  CustomerSchema,
} from '@/infra/database/mongoose/models/customer-schema'
import { INestApplication } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CustomerFactory } from 'test/factories/make-customer'

describe('Fetcg customers(E2E)', () => {
  let app: INestApplication
  let customerFactory: CustomerFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        DatabaseModule,
        MongooseModule.forFeature([
          {
            name: Customer.name,
            schema: CustomerSchema,
          },
        ]),
      ],
      providers: [CustomerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    customerFactory = app.get(CustomerFactory)

    await app.init()
  })

  test('[POST] /customers page size 10', async () => {
    for (let i = 0; i < 10; i++) {
      customerFactory.makeMongooseCustomer()
    }

    const response = await request(app.getHttpServer())
      .get('/customers')
      .query({ page: 1 })
      .query({ pageSize: 10 })

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(10)
  })

  test('[POST] /customers second page and pageSize 5', async () => {
    for (let i = 0; i < 5; i++) {
      customerFactory.makeMongooseCustomer()
    }

    const response = await request(app.getHttpServer())
      .get('/customers')
      .query({ page: 2 })
      .query({ pageSize: 10 })

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(5)
  })
})
