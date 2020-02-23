import * as path from 'path';
import { makeSchema } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';

import * as types from './types';

export const schema = makeSchema({
    types,
    plugins: [nexusPrismaPlugin()],
    outputs: {
        typegen: path.join(__dirname, '../node_modules/@types/nexus-typegen/index.d.ts'),
    },
});
