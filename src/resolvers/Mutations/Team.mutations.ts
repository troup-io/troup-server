import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';

import { Context } from 'utils';

export function TeamMutations(t: ObjectDefinitionBlock<'Mutation'>): void {
    t.field('checkTeamName', {
        type: 'Boolean',
        description: 'Check if a team by the given name already exists.',
        args: {
            teamName: stringArg({ required: true, description: 'Team name to check against.' }),
        },
        async resolve(_, { teamName }, ctx: Context) {
            return !!(await ctx.prisma.team.count({ where: { name: teamName } }));
        },
    });
}
