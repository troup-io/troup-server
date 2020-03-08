import { objectType } from 'nexus';

export const TroupProfile = objectType({
    name: 'TroupProfile',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.name();
        t.model.adminEmail();
        t.model.address();
    },
});
