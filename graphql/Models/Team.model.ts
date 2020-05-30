import { schema } from 'nexus';

export default schema.objectType({
    name: 'Team',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.name();
        t.model.displayName();
        t.model.adminEmail();
        t.model.maxMembers();
        t.model.members();
        t.model.owner();
        t.model.ownerId();
    },
});
