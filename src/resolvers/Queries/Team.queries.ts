import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';

import { Context } from 'utils';

export function TeamQueries(t: ObjectDefinitionBlock<'Query'>): void {
    t.field('team', {
        type: 'Team',
        description: 'Fetch the data of a particular team by ID',
        args: {
            id: stringArg({ required: true, description: "Team's ID to fetch data for." }),
        },
        async resolve(_, { id }: { id: string }, ctx: Context) {
            return await ctx.prisma.team.findOne({ where: { id } });
        },
    });
}
