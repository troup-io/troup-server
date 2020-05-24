import { rule } from 'graphql-shield';

import { Context } from 'services/Context';

export const isAuthenticated = rule({
    cache: 'contextual',
})((parent, args, ctx: Context): boolean => Boolean(ctx.provider.getHeader('userId')));
