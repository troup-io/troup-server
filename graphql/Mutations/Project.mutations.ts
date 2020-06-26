import { schema } from 'nexus';

import { Context } from '../../services/Context';

export default schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createProject', {
            type: 'Project',
            description: 'Create a new project.',
            args: {
                name: schema.stringArg({
                    required: true,
                    description: 'Name of the project to create.',
                }),
                members: schema.intArg({
                    description: 'An array of user IDs to associate as members.',
                    list: true,
                }),
            },
            async resolve(_, data, ctx: Context) {
                return await ctx.project.create(data);
            },
        });
    },
});
