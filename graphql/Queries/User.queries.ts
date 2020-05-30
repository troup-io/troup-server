import { schema } from 'nexus';

import { Context } from '../../services/Context';

export default schema.extendType({
    type: 'Query',
    definition(t) {
        t.field('checkIfUserExists', {
            type: 'Boolean',
            description: 'Check if a user already exists while creating',
            args: {
                email: schema.stringArg({
                    required: true,
                    description: "User's email to check against.",
                }),
            },
            async resolve(_, data, ctx: Context) {
                return await ctx.user.checkIfExists(data);
            },
        });

        t.field('userDetails', {
            type: schema.objectType({
                name: 'UserDetails',
                definition(t) {
                    t.model('User')
                        .id()
                        .createdAt()
                        .updatedAt()
                        .email()
                        .profile();
                },
            }),
            description:
                'Get bare-minimal user details to populate the interface and identify the user.',
            async resolve(_, data, ctx: Context) {
                return await ctx.user.userDetails();
            },
        });

        t.field('getUserTeams', {
            type: schema.objectType({
                name: 'UserTeamDetails',
                definition(t) {
                    t.model('Team').id();
                    t.model('Team').name();
                    t.model('Team').displayName();
                },
            }),
            list: true,
            description: 'Get all the teams the user is associated with as an owner or a member.',
            async resolve(_, __, ctx: Context) {
                return await ctx.user.getUserTeams();
            },
        });
    },
});
