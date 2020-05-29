import { objectType } from 'nexus';

export const UserData = objectType({
    name: 'UserData',
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

export const TeamSigninData = objectType({
    name: 'TeamSigninData',
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
        t.model('Team').id();
        t.model('Team').name();
        t.model('Team').displayName();
    },
});

export const UserTeamDetails = objectType({
    name: 'UserTeamDetails',
    definition(t) {
        t.model('User').ownerTeams({
            ordering: true,
            filtering: true,
            pagination: true,
        });
        t.model('User').memberTeams({
            ordering: true,
            filtering: true,
            pagination: true,
        });
    },
});
