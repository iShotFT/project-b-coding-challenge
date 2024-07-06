import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'
import { GraphQLTimestamp, GraphQLUUID } from 'graphql-scalars'

@ObjectType({ description: 'employee' })
export class Employee {
  @Field((type) => GraphQLUUID)
  id: string

  @Field((type) => String)
  firstName: string

  @Field((type) => String)
  lastName: string

  @Field((type) => GraphQLTimestamp, { nullable: true })
  dob: Date

  @Field((type) => String)
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

  @Field((type) => GraphQLTimestamp)
  createdAt: Date

  @Field((type) => GraphQLTimestamp)
  updatedAt: Date

  @Field((type) => GraphQLTimestamp, { nullable: true })
  deletedAt: Date

  static create(data: Employee): Employee {
    return {...data, createdAt: new Date(), updatedAt: new Date()}
  }
}
