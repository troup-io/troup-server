import { schema } from 'nexus';

import { Context } from '../../services/Context';

export default schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('checkTeamName', {
            type: 'Boolean',
            description: 'Check if a team by the given name already exists.',
            args: {
                teamName: schema.stringArg({
                    required: true,
                    description: 'Team name to check against.',
                }),
            },
            resolve(_, { teamName }, ctx: Context) {
                return ctx.team.checkIfExists({ teamName });
            },
        });
    },
});
