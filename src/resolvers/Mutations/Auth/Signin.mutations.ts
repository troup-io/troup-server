import * as jwt from 'jsonwebtoken';
import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';

import { Context, checkPasswordMatch, checkUserTeam } from 'utils';
import { UserInputError } from 'apollo-server-express';

export function SigninMutations(t: ObjectDefinitionBlock<'Mutation'>): void {
    t.field('signinUser', {
        type: 'UserSignupData',
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
        async resolve(_, { email, password }, ctx: Context) {
            const user = await ctx.prisma.user.findOne({
                where: { email },
                include: {
                    profile: true,
                    teams: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });

            if (!user) {
                throw new UserInputError(`No such user found for email: ${email}`);
            }

            if (!(await checkPasswordMatch(user, password))) {
                throw new UserInputError('Invalid password');
            }

            return {
                token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
                user,
            };
        },
    });

    t.field('signinTeam', {
        type: 'UserSignupData',
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
        },
        async resolve(_, { email, password }, ctx: Context) {
            const user = await ctx.prisma.user.findOne({
                where: { email },
                include: {
                    profile: true,
                    teams: {
                        select: {
                            id: true,
                        },
                    },
                },
            });

            if (!user) {
                throw new Error(`No such user found for email: ${email}`);
            }

            if (!checkUserTeam(user)) {
                throw new Error(`User (${email}) is not a member of this team.`);
            }

            if (!(await checkPasswordMatch(user, password))) {
                throw new Error('Invalid password');
            }

            return {
                token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
                user,
            };
        },
    });
}
