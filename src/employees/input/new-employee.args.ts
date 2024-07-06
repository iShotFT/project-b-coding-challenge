import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { GraphQLTimestamp, GraphQLUUID } from 'graphql-scalars'

@InputType()
export class NewEmployeeInput {
  @Field((type) => GraphQLUUID, { nullable: true })
  id: string

  @Field((type) => String)
  @MinLength(2, { message: "The first name must be at least 2 characters" })
  firstName: string

  @Field((type) => String)
  @MinLength(2, { message: "The last name must be at least 2 characters" })
  lastName: string

  @Field((type) => GraphQLTimestamp, { nullable: true })
  dob: Date

  @Field((type) => String)
  @IsEmail()
  email: string

  @Field((type) => String, { nullable: true })
  phone: string

  @Field((type) => String, { nullable: true })
  address: string

  @Field((type) => String, { nullable: true })
  city: string

  @Field((type) => String, { nullable: true })
  postalCode: string

  @Field((type) => String, { nullable: true })
  country: string

  @Field((type) => GraphQLTimestamp, { nullable: true })
  createdAt: Date

  @Field((type) => GraphQLTimestamp,  { nullable: true })
  updatedAt: Date

  @Field((type) => GraphQLTimestamp, { nullable: true })
  deletedAt: Date
}
