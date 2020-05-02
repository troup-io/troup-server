import { tokenRetriever } from 'utils';
import { Request, Response } from 'express-serve-static-core';

export function middlewareAuth() {
    return function(request: Request, response: Response, next: Function): void {
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
