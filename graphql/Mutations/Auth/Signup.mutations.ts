import { schema } from 'nexus';

import { Context } from '../../../services/Context';

import { UserData, TeamSignupData } from '../../Types';

export default schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('signupUser', {
            type: UserData,
            description: "Team creation flow. The created user is the team's owner.",
            args: {
                email: schema.stringArg({
                    required: true,
                    description: "The user's email address.",
                }),
                password: schema.stringArg({
                    required: true,
                    description: "The user's password.",
                }),
                firstName: schema.stringArg({
                    required: true,
                    description: "The user's first name.",
                }),
                lastName: schema.stringArg({
                    required: true,
                    description: "The user's last name.",
                }),
                teamId: schema.intArg({
                    required: true,
                    description: 'The ID of the team sign up with.',
                }),
            },
            async resolve(_, data, ctx: Context) {
                return await ctx.auth.signup.signupUser(data);
            },
        });

        t.field('signupTeam', {
            type: TeamSignupData,
            description:
                'Create a user and the relevant profile, along with the team and relevant profile.',
            args: {
                email: schema.stringArg({
                    required: true,
                    description: "The user's email address.",
                }),
                password: schema.stringArg({
                    required: true,
                    description: "The user's password.",
                }),
                firstName: schema.stringArg({
                    required: true,
                    description: "The user's first name.",
                }),
                lastName: schema.stringArg({
                    required: true,
                    description: "The user's last name.",
                }),
                teamName: schema.stringArg({
                    required: true,
                    description: 'The name of the team being created. Must be unique.',
                }),
            },
            async resolve(_, data, ctx: Context) {
                return await ctx.auth.signup.signupTeam(data);
            },
        });
    },
});
