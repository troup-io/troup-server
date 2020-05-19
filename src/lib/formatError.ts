import { GraphQLError } from 'graphql';

export function formatError(error: GraphQLError): GraphQLError {
    error.message = error.message.replace(/(GraphQL\s*Error)|(Network\s*Error)/gi, '');
    return error;
}
