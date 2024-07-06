import { Field, InputType, PartialType } from '@nestjs/graphql'
import { IsEmail, Min, MinLength } from 'class-validator'
import { GraphQLTimestamp, GraphQLUUID } from 'graphql-scalars'
import { NewEmployeeInput } from './new-employee.args'

@InputType()
export class UpdateEmployeeInput extends PartialType(NewEmployeeInput) {}
