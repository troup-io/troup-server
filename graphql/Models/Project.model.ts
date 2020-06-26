import { schema } from 'nexus';

export default schema.objectType({
    name: 'Project',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.sequence();
        t.model.name();
        t.model.team();
        t.model.teamId();
        t.model.members({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.model.tickets({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.model.labels({
            filtering: true,
            ordering: true,
            pagination: true,
        });
    },
});
