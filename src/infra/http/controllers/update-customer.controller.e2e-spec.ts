import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import {
  Customer,
  CustomerSchema,
} from '@/infra/database/mongoose/models/customer-schema'
import { INestApplication } from '@nestjs/common'
import { getModelToken, MongooseModule } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Model } from 'mongoose'
import request from 'supertest'
import { CustomerFactory } from 'test/factories/make-customer'

describe('Update customer(E2E)', () => {
  let app: INestApplication
  let customerFactory: CustomerFactory
  let customerModel: Model<Customer>

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
    customerModel = app.get(getModelToken(Customer.name))

    await app.init()
  })

  test('[PUT] /customers/:id', async () => {
    const customer = await customerFactory.makeMongooseCustomer({
      name: 'John Doe',
      email: 'johndoe123567@example.com',
      birthDate: new Date(1998, 4, 4),
    })

    const response = await request(app.getHttpServer())
      .put(`/customers/${customer.id.toString()}`)
      .send({
        name: 'John Doe updated name',
        email: 'johndoe202223332@example.com.br',
        birthDate: '2002-10-15',
      })

    const updatedCustomer = await customerModel.findById(customer.id.toString())

    expect(updatedCustomer?.name).toEqual('John Doe updated name')
    expect(updatedCustomer?.email).toEqual('johndoe2022@example.com.br')
    expect(updatedCustomer?.updatedAt).toBeTruthy()

    expect(response.status).toBe(204)
  })
})
