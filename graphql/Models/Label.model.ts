import { schema } from 'nexus';

export default schema.objectType({
    name: 'Label',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.team();
        t.model.teamId();
        t.model.isGlobal();
        t.model.value();
        t.model.background();
        t.model.project();
        t.model.projectId();
        t.model.tickets({
            filtering: true,
            ordering: true,
            pagination: true,
        });
    },
});
