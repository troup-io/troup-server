import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';
import { ApolloError } from 'apollo-server-express';

import { Context } from 'utils';

export function TeamQueries(t: ObjectDefinitionBlock<'Query'>): void {
    t.field('teamIdFromName', {
        type: 'String',
        description: 'Fetch the ID of a particular team by name.',
        args: {
            name: stringArg({ required: true, description: "Team's name to fetch data for." }),
        },
        async resolve(_, { name }, ctx: Context) {
            if (!name) {
                throw new ApolloError('Please provide an ID or name to query the team by.');
            }

            const team = await ctx.prisma.team.findOne({ where: { name } });

            if (!team) {
                throw new ApolloError('No such team exists.');
            }

            return team.id;
        },
    });
}
