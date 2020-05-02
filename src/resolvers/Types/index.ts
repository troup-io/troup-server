import { objectType } from 'nexus';

export const UserSignupData = objectType({
    name: 'UserSignupData',
    definition(t) {
        t.field('user', {
            type: 'User',
            description: 'The user object.',
        });
        t.string('token', {
            description: 'The encoded JWT token.',
        });
    },
});

export const TeamSignupData = objectType({
    name: 'TeamSignupData',
    definition(t) {
        t.field('team', {
            type: 'Team',
            description: 'The team object.',
        });
        t.field('user', {
            type: 'User',
            description: 'The user object.',
        });
        t.string('token', {
            description: 'The encoded  JWT token.',
        });
    },
});
