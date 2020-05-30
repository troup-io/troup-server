import { schema } from 'nexus';

import { Context } from '../../services/Context';

export default schema.extendType({
    type: 'Query',
    definition(t) {
        t.field('teamDetailsFromName', {
            type: schema.objectType({
                name: 'TeamAuthInfoData',
                definition(t) {
                    t.model('Team').id();
                    t.model('Team').name();
                    t.model('Team').displayName();
                },
            }),
            description: 'Fetch the information of a particular team by name.',
            args: {
                name: schema.stringArg({
                    required: true,
                    description: "Team's name to fetch data for.",
                }),
            },
            async resolve(_, data, ctx: Context) {
                return await ctx.team.teamDetailsFromName(data);
            },
        });
    },
});
