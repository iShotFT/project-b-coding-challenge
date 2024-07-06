import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { UUIDResolver } from 'graphql-scalars'
import { join } from 'path'
import { EmployeesModule } from './employees/employees.module'
import { ConfigModule } from '@nestjs/config'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { BullModule } from '@nestjs/bullmq'
import { GraphQLErrorExtension } from './types/errors'

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
      },
    }),
    EmployeesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: process.env.MODE_DEBUG === 'true',
      playground: process.env.MODE_DEBUG === 'true',
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      sortSchema: true,
      resolvers: {
        UUID: UUIDResolver,
      },
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions
            ? (
                error.extensions as unknown as GraphQLErrorExtension
              ).originalError?.message.join(',')
            : error.message,
        }
        return graphQLFormattedError
      }, // Pfieeeuw, this was quite a struggle, but we finally got it working, first tried to follow the solution here: https://stackoverflow.com/a/64129469 but that ended up throwing even more errors
    }), // We are using schema-first approach for the GraphQL implementation
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
