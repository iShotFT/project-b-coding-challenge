// This function is certainly not where it should be but wanted to move fast and break things
export const isGraphQLErrorExtension = (extensions: any): extensions is GraphQLErrorExtension => {
  return (
      typeof extensions === 'object' &&
      extensions !== null &&
      'code' in extensions &&
      'stacktrace' in extensions &&
      Array.isArray(extensions.stacktrace)
  );
}

export interface GraphQLErrorExtension {
  code: string
  stacktrace: string[]
  originalError?: {
    message: string[] | string
    error: string
    statusCode: number
  }
}
