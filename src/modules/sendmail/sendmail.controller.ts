import { config } from '../../configs'
import { SendMailRequest } from '../../entities/sendmailRequest.entity'
import SendMailService from './sendmail.service'

class SendMailController {
  sendMailService: SendMailService
  constructor() {
    this.sendMailService = new SendMailService()
  }
  public async sendMail({
    subject,
    text,
    html,
  }: {
    subject: string
    text: string
    html?: string
  }) {
    return this.sendMailService.sendMail({
      to: config.receiverEmail,
      from: config.verifiedEmailSender,
      subject,
      text,
      html,
    })
  }
}

export default SendMailController
