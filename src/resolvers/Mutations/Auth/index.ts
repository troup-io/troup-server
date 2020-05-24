import { ObjectDefinitionBlock } from 'nexus/dist/core';

import { Context } from 'services/Context';

import { TokenRefreshData } from 'resolvers/Types';

import { SigninMutations } from './Signin.mutations';
import { SignupMutations } from './Signup.mutations';

export function AuthMutations(t: ObjectDefinitionBlock<'Mutation'>): void {
    SigninMutations(t);
    SignupMutations(t);

    t.field('refreshAuthToken', {
        type: TokenRefreshData,
        description: "Refresh a user's token if the user has chosen to remember them.",
        resolve(_, __, ctx: Context) {
            return ctx.auth.core.refreshAuthToken();
        },
    });
}
