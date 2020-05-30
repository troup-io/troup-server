import { schema } from 'nexus';

export default schema.objectType({
    name: 'User',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.email();
        t.model.ownerTeams({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.model.memberTeams({
            filtering: true,
            ordering: true,
            pagination: true,
        });
    },
});
