import { objectType } from 'nexus';

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.email();
        t.model.profile();
        t.model.ownerTeams({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.model.memberTeams({
            filtering: true,
            ordering: {
                id: true,
            },
            pagination: true,
        });
    },
});
