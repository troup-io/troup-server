import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';

import { Context } from 'utils';

export function UserMutation(t: ObjectDefinitionBlock<'Mutation'>) {
    t.field('signup', {
        type: 'UserSignupData',
        description: 'Create a user and the relevant user profile. ',
        args: {
            email: stringArg({ required: true }),
            password: stringArg({ required: true }),
            firstName: stringArg({ required: true }),
            lastName: stringArg({ required: true }),
        },
        async resolve(_, { email, password, firstName, lastName }, ctx: Context) {
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
                },
            });

            return {
                user,
                token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
            };
        },
    });

    t.field('signin', {
        type: 'UserSignupData',
        description: 'Sign a user and return the token and the user.',
        args: {
            email: stringArg({ required: true }),
            password: stringArg({ required: true }),
        },
        async resolve(_, { email, password }, ctx: Context) {
            const user = await ctx.prisma.user.findOne({ where: { email } });

            if (!user) {
                throw new Error(`No such user found for email: ${email}`);
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new Error('Invalid password');
            }

            return {
                token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
                user,
            };
        },
    });
}
