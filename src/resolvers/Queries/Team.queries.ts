import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';

import { Context } from 'services/Context';

export function TeamQueries(t: ObjectDefinitionBlock<'Query'>): void {
    t.field('teamDetailsFromName', {
        type: 'TeamAuthInfoData',
        description: 'Fetch the information of a particular team by name.',
        args: {
            name: stringArg({ required: true, description: "Team's name to fetch data for." }),
        },
        async resolve(_, data, ctx: Context) {
            return await ctx.team.teamDetailsFromName(data);
        },
    });
}
