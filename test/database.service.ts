import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection } from 'mongoose'

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async clearDatabase() {
    const collections = Object.keys(this.connection.collections)

    for (const collectionName of collections) {
      const collection = this.connection.collections[collectionName]
      await collection.deleteMany({})
    }

    this.connection.close()
  }
}
