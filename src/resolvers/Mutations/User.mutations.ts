import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';

import { Context, checkPasswordMatch, checkUserTroup, tokenSigner } from 'utils';

export function UserMutations(t: ObjectDefinitionBlock<'Mutation'>): void {
    t.field('checkIfUserExists', {
        type: 'Boolean',
        description: 'Check if a user already exists while creating',
        args: {
            email: stringArg({ required: true }),
        },
        async resolve(_, { email }, ctx: Context) {
            return !!(await ctx.prisma.user.findOne({ where: { email } }));
        },
    });

    t.field('signupUser', {
        type: 'UserSignupData',
        description: 'Create a user and the relevant user profile. ',
        args: {
            email: stringArg({ required: true }),
            password: stringArg({ required: true }),
            firstName: stringArg({ required: true }),
            lastName: stringArg({ required: true }),
            troupId: stringArg({ required: true }),
        },
        async resolve(_, { email, password, firstName, lastName, troupId }, ctx: Context) {
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
                    troups: {
                        connect: {
                            id: troupId,
                        },
                    },
                    roles: {
                        create: {
                            troup: {
                                connect: {
                                    id: troupId,
                                },
                            },
                            value: 'CONTRIBUTOR',
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

    t.field('signupTroup', {
        type: 'TroupSignupData',
        description:
            'Create a user and the relevant profile, along with the Troup and relevant profile.',
        args: {
            email: stringArg({ required: true }),
            password: stringArg({ required: true }),
            firstName: stringArg({ required: true }),
            lastName: stringArg({ required: true }),
            troupName: stringArg({ required: true }),
        },
        async resolve(_, { email, password, firstName, lastName, troupName }, ctx: Context) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const existingUser = await ctx.prisma.user.findOne({ where: { email } });
            if (existingUser) {
                throw new Error('User already exists!');
            }

            const existingTroup = await ctx.prisma.troupProfile.findOne({
                where: { name: troupName },
            });
            if (existingTroup) {
                throw new Error('Troup already exists.');
            }

            const troup = await ctx.prisma.troup.create({
                data: {
                    profile: {
                        create: {
                            name: troupName,
                        },
                    },
                    primaryUser: {
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
                    primaryUser: {
                        select: {
                            id: true,
                        },
                    },
                },
            });

            await ctx.prisma.role.create({
                data: {
                    value: 'ADMIN',
                    user: {
                        connect: {
                            id: troup.primaryUser.id,
                        },
                    },
                    troup: {
                        connect: {
                            id: troup.id,
                        },
                    },
                },
            });

            return {
                troup,
                token: tokenSigner(troup.primaryUser.id),
            };
        },
    });

    t.field('signin', {
        type: 'UserSignupData',
        description: 'Sign a user and return the token and the user.',
        args: {
            email: stringArg({ required: true }),
            password: stringArg({ required: true }),
            context: stringArg({ required: true }),
        },
        async resolve(_, { email, password, context }, ctx: Context) {
            const user = await ctx.prisma.user.findOne({
                where: { email },
                include: {
                    troups: {
                        where: {
                            id: context,
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

            if (!checkUserTroup(user.troups)) {
                throw new Error(`User (${email}) is not a member of this Troup.`);
            }

            if (!(await checkPasswordMatch(user.password, password))) {
                throw new Error('Invalid password');
            }

            return {
                token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
                user,
            };
        },
    });

    t.crud.deleteOneUser();
    t.crud.deleteOneUserProfile();
}
