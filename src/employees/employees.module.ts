import { Module } from '@nestjs/common';
import { EmployeesResolver } from './employees.resolver';
import { EmployeesService } from './employees.service';
import { EmailsModule } from 'src/emails/emails.module';

@Module({
  imports: [EmailsModule],
  providers: [EmployeesResolver, EmployeesService],
})
export class EmployeesModule {}
