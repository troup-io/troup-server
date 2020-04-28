import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';

import { Context } from 'utils';

export function TeamMutations(t: ObjectDefinitionBlock<'Mutation'>): void {
    t.field('checkTeamName', {
        type: 'Boolean',
        description: 'Check if a Team by that name already exists.',
        args: {
            name: stringArg({ required: true }),
        },
        async resolve(_, { name }, ctx: Context) {
            return !!(await ctx.prisma.team.findOne({ where: { name } }));
        },
    });
}
