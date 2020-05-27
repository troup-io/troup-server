import { GraphQLError } from 'graphql';
import { Result } from 'apollo-server-express';

export function formatError(error: GraphQLError): GraphQLError {
    error.message = error.message.replace(/(GraphQL\s*Error)|(Network\s*Error)/gi, '');
    return error;
}

export function formatResponse(response: Result): Result {
    // TOTO-ss: Explore possibilities and use-cases.

    return response;
}
