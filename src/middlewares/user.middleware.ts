import { ContextParameters } from 'graphql-yoga/dist/types';

import { Context } from 'utils';

export function middleware_User(prisma: Context['prisma']) {
    return async function(
        request: ContextParameters['request'],
        response: ContextParameters['response'],
        next: Function
    ) {
        delete request.headers.isSuperAdmin;

        if (request.headers.su) {
            try {
                const user = await prisma.user.findOne({
                    where: { id: request.headers.userId as string },
                    select: {
                        profile: {
                            select: {
                                isSuperAdmin: true,
                            },
                        },
                    },
                });
                if (user.profile.isSuperAdmin) {
                    request.headers.isSuperAdmin = 'true';
                } else {
                    delete request.headers.isSuperAdmin;
                }
            } catch (error) {
                console.log('USER_MIDDLEWARE', error.message);
                response.removeHeader('su');
            }
        }

        return next();
    };
}
