import { schema } from 'nexus';

import { Context } from '../../../services/Context';

import { UserData, TeamSigninData } from '../../../graphql/Types';

export default schema.mutationType({
    definition(t) {
        t.field('signinUser', {
            type: UserData,
            description: 'General sign in with an email and return the token and user.',
            args: {
                email: schema.stringArg({
                    required: true,
                    description: "The user's email address.",
                }),
                password: schema.stringArg({
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
                email: schema.stringArg({
                    required: true,
                    description: "The user's email address.",
                }),
                password: schema.stringArg({
                    required: true,
                    description: "The user's password.",
                }),
                teamId: schema.intArg({
                    required: true,
                    description: "The team's ID.",
                }),
            },
            async resolve(_, data, ctx: Context) {
                return await ctx.auth.signin.signinTeam(data);
            },
        });
    },
});
