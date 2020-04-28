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

export const TeamSignupData = objectType({
    name: 'TeamSignupData',
    definition(t) {
        t.field('team', {
            type: 'Team',
        });
        t.string('token');
    },
});
