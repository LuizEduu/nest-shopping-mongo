import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../src/infra/app.module'
import { DatabaseService } from './database.service'

let app: TestingModule
let databaseService: DatabaseService

beforeAll(async () => {
  app = await Test.createTestingModule({
    imports: [AppModule],
    providers: [DatabaseService],
  }).compile()

  databaseService = app.get<DatabaseService>(DatabaseService)
})

afterAll(async () => {
  await databaseService.clearDatabase()
  await app.close()
})
