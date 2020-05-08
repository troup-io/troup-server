import { ObjectDefinitionBlock } from 'nexus/dist/core';

import { SigninMutations } from './Signin.mutations';
import { SignupMutations } from './Signup.mutations';

import { Context, tokenRetriever, tokenSigner } from 'utils';

export function AuthMutations(t: ObjectDefinitionBlock<'Mutation'>): void {
    SigninMutations(t);
    SignupMutations(t);

    t.field('refreshAuthToken', {
        type: 'TokenRefreshData',
        description: "Refresh a user's token if the user has chosen to remember them.",
        resolve(_, __, ctx: Context) {
            const { userId } = tokenRetriever(ctx.request.headers.authorization, true);
            return {
                token: tokenSigner(userId),
            };
        },
    });
}
