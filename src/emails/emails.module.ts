import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { EmailsConsumer } from './emails.processor';
import { EmailsService } from './emails.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emails',
    }),
  ],
  controllers: [],
  providers: [EmailsConsumer, EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}