import { use, schema, settings } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';
import { PrismaClient } from 'nexus-plugin-prisma/client';

import { ContextInit } from './services/Context';

const prismaClient = new PrismaClient();

use(
    prisma({
        client: {
            instance: prismaClient,
        },
    })
);

schema.addToContext(request => {
    return ContextInit({
        request,
        prisma: prismaClient,
    });
});

settings.change({
    logger: {
        pretty: true,
    },
});
