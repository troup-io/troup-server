import * as path from 'path';
import { makeSchema, fieldAuthorizePlugin } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';

import types from 'resolvers';

export const schema = makeSchema({
    types,
    plugins: [
        nexusPrismaPlugin(),
        // nullabilityGuardPlugin({
        //     shouldGuard: !process.env.NODE_ENV || process.env.NODE_ENV !== 'development',
        //     fallbackValues: {
        //         String: (): string => '',
        //         Boolean: (): boolean => false,
        //         Int: (): number => 0,
        //         DateTime: (): string => new Date().toISOString(),
        //     },
        // }),
        fieldAuthorizePlugin(),
    ],
    outputs: {
        typegen: path.join(__dirname, '../node_modules/@types/nexus-typegen/index.d.ts'),
    },
});
