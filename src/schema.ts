import * as path from 'path';
import { makeSchema, nullabilityGuardPlugin, fieldAuthorizePlugin } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';

import types from 'resolvers';

export const schema = makeSchema({
    types,
    plugins: [
        nexusPrismaPlugin(),
        nullabilityGuardPlugin({
            shouldGuard: !process.env.NODE_ENV || process.env.NODE_ENV !== 'development',
            fallbackValues: {
                Int: (): number => 0,
                String: (): string => '',
                DateTime: (): string => new Date().toISOString(),
                Boolean: (): boolean => false,
            },
        }),
        fieldAuthorizePlugin(),
    ],
    outputs: {
        typegen: path.join(__dirname, '../node_modules/@types/nexus-typegen/index.d.ts'),
    },
});
