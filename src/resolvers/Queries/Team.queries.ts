import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';

import { Context } from 'utils';

export function TeamQueries(t: ObjectDefinitionBlock<'Query'>): void {
    t.field('team', {
        type: 'Team',
        description: 'Fetch the data of a particular Team by ID',
        args: {
            id: stringArg({ required: true }),
        },
        async resolve(_, { id }: { id: string }, ctx: Context) {
            return await ctx.prisma.team.findOne({ where: { id } });
        },
    });

    // t.crud.troups({ ordering: true, filtering: true });
}
