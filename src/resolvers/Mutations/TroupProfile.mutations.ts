import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';
import { Context } from 'utils';

export function TroupProfileMutations(t: ObjectDefinitionBlock<'Mutation'>) {
    t.field('checkTroupName', {
        type: 'Boolean',
        description: 'Check if a Troup profile by that name already exists.',
        args: {
            name: stringArg({ required: true }),
        },
        async resolve(_, { name }, ctx: Context) {
            const troup = await ctx.prisma.troupProfile.findOne({ where: { name } });

            if (troup) {
                return true;
            }

            return false;
        },
    });
}
