import { GraphQLError } from 'graphql';
import { Result } from 'apollo-server-express';

export function formatError(error: GraphQLError): GraphQLError {
    error.message = error.message.replace(/(GraphQL\s*Error)|(Network\s*Error)/gi, '');
    return error;
}

export function formatResponse(response: Result): Result {
    return Object.entries(response).reduce((partialResponse, [key, value]) => {
        if (value) {
            partialResponse[key] = value;
        }

        return partialResponse;
    }, {});
}
