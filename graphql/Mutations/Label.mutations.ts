import { schema } from 'nexus';

import { Context } from '../../services/Context';

export default schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createGlobalLabel', {
            type: 'Label',
            description: 'Create a new global label.',
            args: {
                value: schema.stringArg({
                    required: true,
                    description: 'The value of the label.',
                }),
                color: schema.stringArg({
                    description: 'The color of the label.',
                }),
            },
            async resolve(_, data, ctx: Context) {
                return await ctx.label.create(data);
            },
        });
    },
});
