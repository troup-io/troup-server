import { schema } from 'nexus';

export default schema.objectType({
    name: 'Ticket',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.team();
        t.model.teamId();
        t.model.author();
        t.model.authorId();
        t.model.sequence();
        t.model.title();
        t.model.body();
        t.model.project();
        t.model.projectId();
        t.model.labels({
            filtering: true,
            ordering: true,
            pagination: true,
        });
    },
});
