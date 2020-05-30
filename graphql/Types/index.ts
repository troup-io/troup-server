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
