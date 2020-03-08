import { objectType } from 'nexus';

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.email();
        t.string('profileId', {
            resolve() {
                return t.model.profile().id.toString();
            },
        });
        t.model.profile();
    },
});
