import { AuthenticationError } from 'apollo-server-express';

import { Middleware } from '../types/helpers.types';

import { AuthErrors } from '../errors/auth.errors';

import { getUserId, getTeamId } from '../utils';

export const ResourceCheckMiddleware: Middleware = () => async (
    root,
    args,
    context,
    info,
    next
): Promise<void> => {
    const { request } = context;
    const userId = getUserId.call({ request });
    const teamId = getTeamId.call({ request });

    const accessValid = await context.db.user.count({
        where: {
            AND: [
                {
                    id: userId,
                },
                {
                    OR: [
                        {
                            memberTeams: {
                                some: { id: teamId },
                            },
                        },
                        {
                            ownerTeams: {
                                some: { id: teamId },
                            },
                        },
                        {
                            profile: {
                                isSuperAdmin: true,
                            },
                        },
                    ],
                },
            ],
        },
    });

    if (!accessValid) {
        throw new AuthenticationError(AuthErrors.ACCESS_DENIED);
    }

    return await next(root, args, context, info);
};
