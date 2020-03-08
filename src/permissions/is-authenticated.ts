import { rule } from 'graphql-shield';

import { Context } from '@utils';

export const isAuthenticated = rule({
    cache: 'contextual',
})((parent, args, ctx: Context): boolean => Boolean(ctx.request.headers.userId));
