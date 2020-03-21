import { objectType } from 'nexus';

export const UserSignupData = objectType({
    name: 'UserSignupData',
    definition(t) {
        t.field('user', {
            type: 'User',
        });
        t.string('token');
    },
});

export const TroupSignupData = objectType({
    name: 'TroupSignupData',
    definition(t) {
        t.field('troup', {
            type: 'Troup',
        });
        t.string('token');
    },
});
