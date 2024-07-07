import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { makeCustomer } from 'test/factories/make-customer'

describe('Create customer(E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /customers', async () => {
    const customer = makeCustomer({
      name: 'John Doe',
      email: 'JohnDoe@example.com',
      password: 'senha super forte',
      birthDate: new Date(1998, 10, 10),
    })

    const response = await request(app.getHttpServer())
      .post('/customers')
      .send({
        name: customer.name,
        email: customer.email,
        password: customer.password,
        birthDate: '1998-10-15',
      })

    expect(response.status).toBe(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: customer.name,
        email: customer.email,
        birthDate: expect.stringContaining('1998-10-15'),
        createdAt: expect.any(String),
      }),
    )
  })
})
