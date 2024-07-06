import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { EmailsTypes } from "./emails.type";

@Injectable()
export class EmailsService {
    constructor(@InjectQueue('emails') private readonly emailsQueue: Queue) {}

    async sendEmail(data: EmailsTypes): Promise<void> {
        await this.emailsQueue.add('send', data);
    }
}