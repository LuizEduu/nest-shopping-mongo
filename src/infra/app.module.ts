import { Module } from '@nestjs/common'
import { HttpModule } from './http/http.module'
import { DatabaseModule } from './database/database.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { EmailModule } from './email/email.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    DatabaseModule,
    EmailModule,
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`, {
      authSource: 'admin',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
