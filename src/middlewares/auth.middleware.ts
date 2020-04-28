import { ContextParameters } from 'graphql-yoga/dist/types';
import { tokenRetriever } from 'utils';

export function middlewareAuth() {
    return function(
        request: ContextParameters['request'],
        response: ContextParameters['response'],
        next: Function
    ): void {
        const bearer = request.get('Bearer');
        if (!bearer) {
            return next();
        }

        try {
            const { userId, teamId } = tokenRetriever(bearer);
            request.headers.userId = userId;
            request.headers.teamId = teamId;
        } catch (error) {
            console.log('AUTH_MIDDLEWARE', error.message);
            response.removeHeader('Bearer');
            response.removeHeader('userId');
            response.removeHeader('teamId');
        }

        next();
    };
}
