import { schema } from 'nexus';

export const UserData = schema.objectType({
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

export const TeamSignupData = schema.objectType({
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

export const TeamSigninData = schema.objectType({
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

export const TokenRefreshData = schema.objectType({
    name: 'TokenRefreshData',
    definition(t) {
        t.string('token', {
            description: 'The encoded JWT token',
        });
    },
});

export const TeamAuthInfoData = schema.objectType({
    name: 'TeamAuthInfoData',
    definition(t) {
        t.model('Team').id();
        t.model('Team').name();
        t.model('Team').displayName();
    },
});

export const UserTeamDetails = schema.objectType({
    name: 'UserTeamDetails',
    definition(t) {
        t.model('Team').id();
        t.model('Team').name();
        t.model('Team').displayName();
    },
});

export const randomType = schema.objectType({
    name: 'RandomType',
    definition(t) {
        t.string('hehehe');
    },
});
