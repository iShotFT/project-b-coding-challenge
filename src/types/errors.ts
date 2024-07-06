export interface GraphQLErrorExtension {
    code: string
    stacktrace: string[]
    originalError?: {
      message: string[]
      error: string
      statusCode: number
    }
  }