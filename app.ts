import { config } from 'dotenv';
import { use, schema, settings, server } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';
import { PrismaClient } from 'nexus-plugin-prisma/client';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as compression from 'compression';

config();

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

server.express.use(cors());
server.express.use(helmet());
server.express.use(compression());
