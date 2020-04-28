import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';

import { Context, checkPasswordMatch, checkUserTeam, tokenSigner } from 'utils';

export function AuthMutations(t: ObjectDefinitionBlock<'Mutation'>): void {
    t.field('signupUser', {
        type: 'UserSignupData',
        description: "Team creation flow. The created user is the team's owner.",
        args: {
            email: stringArg({
                required: true,
                description: "The user's email address.",
            }),
            password: stringArg({
                required: true,
                description: "The user's password.",
            }),
            firstName: stringArg({ required: true, description: "The user's first name." }),
            lastName: stringArg({ required: true, description: "The user's last name." }),
            teamId: stringArg({
                required: true,
                description: 'The ID of the team sign up with.',
            }),
        },
        async resolve(_, { email, password, firstName, lastName, teamId }, ctx: Context) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const existingUser = await ctx.prisma.user.findOne({ where: { email } });
            if (existingUser) {
                throw new Error('User already exists!');
            }

            const user = await ctx.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    profile: {
                        create: {
                            firstName,
                            lastName,
                        },
                    },
                    teams: {
                        connect: {
                            id: teamId,
                        },
                    },
                },
            });

            return {
                user,
                token: tokenSigner(user.id),
            };
        },
    });

    t.field('signupTeam', {
        type: 'TeamSignupData',
        description:
            'Create a user and the relevant profile, along with the team and relevant profile.',
        args: {
            email: stringArg({
                required: true,
                description: "The user's email address.",
            }),
            password: stringArg({
                required: true,
                description: "The user's password.",
            }),
            firstName: stringArg({ required: true, description: "The user's first name." }),
            lastName: stringArg({ required: true, description: "The user's last name." }),
            teamName: stringArg({
                required: true,
                description: 'The name of the team being created. Must be unique.',
            }),
        },
        async resolve(_, { email, password, firstName, lastName, teamName }, ctx: Context) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const existingUser = !!(await ctx.prisma.user.count({ where: { email } }));
            if (existingUser) {
                throw new Error('User already exists!');
            }

            const existingTeam = !!(await ctx.prisma.team.count({
                where: { name: teamName },
            }));
            if (existingTeam) {
                throw new Error('Team already exists.');
            }

            const team = await ctx.prisma.team.create({
                data: {
                    name: teamName,
                    owner: {
                        create: {
                            email,
                            password: hashedPassword,
                            profile: {
                                create: {
                                    firstName,
                                    lastName,
                                },
                            },
                        },
                    },
                },
                include: {
                    owner: {
                        select: {
                            id: true,
                        },
                    },
                },
            });

            return {
                team,
                token: tokenSigner(team.owner.id),
            };
        },
    });

    t.field('signin', {
        type: 'UserSignupData',
        description: 'Sign in with an email and return the user and user.',
        args: {
            email: stringArg({
                required: true,
                description: "The user's email address.",
            }),
            password: stringArg({
                required: true,
                description: "The user's password.",
            }),
            teamId: stringArg({
                required: true,
                description: 'The ID of the team to sign in to.',
            }),
        },
        async resolve(_, { email, password, teamId }, ctx: Context) {
            const user = await ctx.prisma.user.findOne({
                where: { email },
                include: {
                    profile: true,
                    teams: {
                        where: {
                            id: teamId,
                        },
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
