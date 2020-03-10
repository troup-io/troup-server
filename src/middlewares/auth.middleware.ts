import * as jwt from 'jsonwebtoken';

import { ContextParameters } from 'graphql-yoga/dist/types';
import { tokenRetriever } from 'utils';

export function middleware_Auth() {
    return function(
        request: ContextParameters['request'],
        response: ContextParameters['response'],
        next: Function
    ) {
        const bearer = request.get('Bearer');
        console.log('bearer', bearer);
        if (!bearer) {
            return next();
        }

        try {
            const { userId, troupId } = tokenRetriever(bearer);
            request.headers.userId = userId;
            request.headers.troupId = troupId;
        } catch (error) {
            console.log('AUTH_MIDDLEWARE', error.message);
            response.removeHeader('Bearer');
            response.removeHeader('userId');
            response.removeHeader('troupId');
        }

        return next();
    };
}
