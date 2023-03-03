import sendgrid from '@sendgrid/mail'
import { config } from '../../configs'
import { SendMailRequest } from '../../entities/sendmailRequest.entity'
class SendMailService {
  constructor() {
    sendgrid.setApiKey(config.sendgridApiKey)
  }
  public async sendMail(msg: SendMailRequest) {
    return sendgrid.send(msg)
  }
}

export default SendMailService
