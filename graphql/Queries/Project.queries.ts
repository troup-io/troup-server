import { schema } from 'nexus';

import { Context } from '../../services/Context';

export default schema.extendType({
    type: 'Query',
    definition(t) {
        t.field('projects', {
            type: 'Project',
            description: 'Get all the projects of a particular team.',
            list: true,
            async resolve(_, __, ctx: Context) {
                return await ctx.project.getAll();
            },
        });
    },
});
