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
            description: 'The encoded JWT token.',
        });
    },
});

export const TokenRefreshData = objectType({
    name: 'TokenRefreshData',
    definition(t) {
        t.string('token', {
            description: 'The encoded JWT token',
        });
    },
});

export const TeamAuthInfoData = objectType({
    name: 'TeamAuthInfoData',
    definition(t) {
        t.int('id', {
            description: "The team's ID",
        });
        t.string('name', {
            description: 'The unique name of the team.',
        });
        t.string('displayName', {
            description: 'The display name of the team.',
        });
    },
});
