import { AuthenticationError } from 'apollo-server-express';

import { Middleware } from '../types/helpers.types';

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
                    ],
                },
            ],
        },
    });

    if (!accessValid) {
        throw new AuthenticationError(
            'You do not have permission to create a resource on this team.'
        );
    }

    return await next(root, args, context, info);
};
