import { schema } from 'nexus';

import { Context } from '../../services/Context';

export default schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createTicket', {
            type: 'Ticket',
            description: 'Create a new ticket.',
            args: {
                projectId: schema.intArg({
                    required: true,
                    description: 'The project to associate this ticket with.',
                }),
                title: schema.stringArg({
                    required: true,
                    description: 'Title of the ticket to create.',
                }),
                body: schema.stringArg({
                    required: true,
                    description: 'The content of the ticket.',
                }),
                labels: schema.stringArg({
                    list: true,
                }),
            },
            async resolve(_, data, ctx: Context) {
                return await ctx.ticket.create(data);
            },
        });
    },
});
