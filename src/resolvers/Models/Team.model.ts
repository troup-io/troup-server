import { objectType } from 'nexus';

export const Team = objectType({
    name: 'Team',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.name();
        t.model.adminEmail();
        t.model.maxMembers();
        t.model.members();
        t.model.userId();
    },
});
