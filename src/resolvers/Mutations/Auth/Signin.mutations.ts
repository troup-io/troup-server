import { ObjectDefinitionBlock, stringArg, intArg } from 'nexus/dist/core';

import { Context } from 'services/Context';

import { UserData, TeamSigninData } from 'resolvers/Types';

export function SigninMutations(t: ObjectDefinitionBlock<'Mutation'>): void {
    t.field('signinUser', {
        type: UserData,
        description: 'General sign in with an email and return the token and user.',
        args: {
            email: stringArg({
                required: true,
                description: "The user's email address.",
            }),
            password: stringArg({
                required: true,
                description: "The user's password.",
            }),
        },
        async resolve(_, data, ctx: Context) {
            return await ctx.auth.signin.signinUser(data);
        },
    });

    t.field('signinTeam', {
        type: TeamSigninData,
        description: 'Team sign in with an email and return the token and user.',
        args: {
            email: stringArg({
                required: true,
                description: "The user's email address.",
            }),
            password: stringArg({
                required: true,
                description: "The user's password.",
            }),
            teamId: intArg({
                required: true,
                description: "The team's ID.",
            }),
        },
        async resolve(_, data, ctx: Context) {
            return await ctx.auth.signin.signinTeam(data);
        },
    });
}
