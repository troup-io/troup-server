import { objectType } from 'nexus';

export const Team = objectType({
    name: 'Team',
    definition(t) {
        t.list;
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
