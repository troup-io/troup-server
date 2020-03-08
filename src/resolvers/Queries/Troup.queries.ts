import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';

import { Context } from 'utils';

export function TroupQueries(t: ObjectDefinitionBlock<'Query'>) {
    t.field('troup', {
        type: 'Troup',
        description: 'Fetch the data of a particular Troup by ID',
        args: {
            id: stringArg({ required: true }),
        },
        async resolve(_, { id }: { id: string }, ctx: Context) {
            return await ctx.prisma.troup.findOne({ where: { id } });
        },
    });

    t.crud.troups({ ordering: true, filtering: true });
}
