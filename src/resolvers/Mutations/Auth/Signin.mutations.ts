import * as jwt from 'jsonwebtoken';
import { ObjectDefinitionBlock, stringArg, intArg } from 'nexus/dist/core';

import { Context, checkPasswordMatch, checkUserTeam, tokenSigner } from 'utils';
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
                    memberTeams: {
                        select: {
                            id: true,
                            name: true,
                            displayName: true,
                        },
                    },
                    ownerTeams: {
                        select: {
                            id: true,
                            name: true,
                            displayName: true,
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
                token: tokenSigner(user.id),
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
            teamId: intArg({
                required: true,
                description: "The team's ID.",
            }),
        },
        async resolve(_, { email, password, teamId: id }, ctx: Context) {
            const user = await ctx.prisma.user.findOne({
                where: { email },
                include: {
                    profile: true,
                    memberTeams: {
                        where: {
                            id,
                        },
                        select: {
                            id: true,
                            name: true,
                            displayName: true,
                        },
                    },
                    ownerTeams: {
                        where: {
                            id,
                        },
                        select: {
                            id: true,
                            name: true,
                            displayName: true,
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
                token: tokenSigner(user.id),
                user,
            };
        },
    });
}
