import { Inviter } from '@/domain/shopping/application/email/inviter'
import { BadGatewayException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import sendgrid from '@sendgrid/mail'

@Injectable()
export class SendGridInviter implements Inviter {
  constructor(private configService: ConfigService) {}

  async send(email: string): Promise<void> {
    try {
      const apiKey = this.configService.getOrThrow<string>('SENDGRID_API_KEY')

      sendgrid.setApiKey(apiKey)

      const message = {
        to: 'nest-shopping@test.com',
        from: email,
        subject: 'validate account',
        text: 'clique no link abaixo para validar sua conta',
        html: '<strong><a>link</a></strong>',
      }

      await sendgrid.send(message)
    } catch (err) {
      throw new BadGatewayException('error to send validation account e-mail.')
    }
  }
}
