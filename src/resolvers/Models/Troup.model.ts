import { objectType } from 'nexus';

export const Troup = objectType({
    name: 'Troup',
    definition(t) {
        t.model.id();
        t.model.createdAt();
        t.model.updatedAt();
        t.model.members();
    },
});
