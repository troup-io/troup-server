import { tokenRetriever } from 'utils';
import { Request, Response } from 'express-serve-static-core';

export function middlewareAuth() {
    return function(request: Request, response: Response, next: Function): void {
        const bearer = request.get('Bearer');
        if (!bearer) {
            return next();
        }

        try {
            const { userId } = tokenRetriever(bearer);
            request.headers.userId = userId;
        } catch (error) {
            response.removeHeader('authorization');
            response.removeHeader('userId');
        }

        next();
    };
}
