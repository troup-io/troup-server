import { GraphQLError } from 'graphql';

type ErrorDefinition = {
    message: string;
    path: unknown;
    locations: unknown;
};

export function formatError(error: GraphQLError): GraphQLError {
    error.message = error.message.replace(/(GraphQL\s*Error)|(Network\s*Error)/gi, '');
    return error;
}
