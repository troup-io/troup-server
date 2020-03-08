import { GraphQLError } from 'graphql';

export function formatError(error: GraphQLError) {
    const { message, path, locations, originalError } = error;

    return {
        message,
        path,
        locations,
        originalError,
    };
}
