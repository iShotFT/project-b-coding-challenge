import { Module } from '@nestjs/common';
import { EmployeesResolver } from './employees.resolver';
import { EmployeesService } from './employees.service';
import { GraphQLUUID } from 'graphql-scalars';

@Module({
  providers: [EmployeesResolver, EmployeesService]
})
export class EmployeesModule {}
