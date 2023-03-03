export interface SendMailRequest {
  to: string
  from: string
  subject?: string
  text: string
  html?: string
}
