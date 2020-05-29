import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';

import { Context } from 'services/Context';
import { UserTeamDetails } from 'resolvers/Types';

export function UserQueries(t: ObjectDefinitionBlock<'Query'>): void {
    t.field('checkIfUserExists', {
        type: 'Boolean',
        description: 'Check if a user already exists while creating',
        args: {
            email: stringArg({ required: true, description: "User's email to check against." }),
        },
        async resolve(_, data, ctx: Context) {
            return await ctx.user.checkIfExists(data);
        },
    });

    t.field('userDetails', {
        type: 'User',
        description:
            'Get bare-minimal user details to populate the interface and identify the user.',
        async resolve(_, data, ctx: Context) {
            return await ctx.user.userDetails();
        },
    });

    t.field('getUserTeams', {
        type: UserTeamDetails,
        description: 'Get all the teams the user is associated with as an owner or a member.',
        async resolve(_, __, ctx: Context) {
            console.log('');
            const res = await ctx.user.getUserTeams();
            console.log('res in resolve');
            console.log(JSON.stringify(res, null, 2));
            console.log('');
            return res;
        },
    });
}
