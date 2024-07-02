import { Module } from '@nestjs/common'
import { HttpModule } from './http/http.module'
import { DatabaseModule } from './database/database.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    MongooseModule.forRoot(
      'mongodb://docker:docker@localhost:27017/nest-mongo',
      {
        authSource: 'admin',
      },
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
