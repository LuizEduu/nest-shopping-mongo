import { Module } from '@nestjs/common'
import { SendGridInviter } from './sendgrid-inviter'
import { Inviter } from '@/domain/shopping/application/email/inviter'

@Module({
  providers: [
    {
      provide: Inviter,
      useClass: SendGridInviter,
    },
  ],
  exports: [Inviter],
})
export class EmailModule {}
