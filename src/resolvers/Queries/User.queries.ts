import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';

import { Context } from 'utils';

export function UserQueries(t: ObjectDefinitionBlock<'Query'>): void {
    t.field('checkIfUserExists', {
        type: 'Boolean',
        description: 'Check if a user already exists while creating',
        args: {
            email: stringArg({ required: true, description: "User's email to check against." }),
        },
        async resolve(_, { email }, ctx: Context) {
            return !!(await ctx.prisma.user.count({ where: { email } }));
        },
    });
}
