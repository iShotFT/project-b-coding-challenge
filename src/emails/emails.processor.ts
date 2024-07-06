import { Processor, WorkerHost, OnQueueEvent } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job } from 'bullmq'
import { EmailsJobNewEmployeeData } from './emails.type'
import * as nodemailer from 'nodemailer' // Could separate all bussiness logic to a different service but for simplicity we will use nodemailer here

@Processor('emails')
export class EmailsConsumer extends WorkerHost {
  private readonly logger = new Logger(EmailsConsumer.name)
  private readonly transporter: nodemailer.Transporter

  constructor() {
    super()
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      secure: false, // use SSL
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    })
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'send': {
        // Parse correct type for job.data
        const data = job.data as EmailsJobNewEmployeeData

        // Send email
        await this.transporter.sendMail({
          from: 'no-reply@vought.com',
          to: data.to,
          subject: 'Welcome to Vought International',
          text: `Hello ${data.fullName},\n\nWelcome to the company!`,
        })

        return {}
      }
      default: {
        break
      }
    }
  }

  @OnQueueEvent('active')
  onActive(job: Job) {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    )
  }
}
