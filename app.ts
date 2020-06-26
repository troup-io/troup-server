import { config } from 'dotenv';
import { use, schema, settings, server } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';
import { PrismaClient } from 'nexus-plugin-prisma/client';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as compression from 'compression';

config();

import { ContextInit } from './services/Context';

import { ResourceCheckMiddleware } from './middleware/resource-check';

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
        db: prismaClient,
    });
});

settings.change({
    logger: {
        pretty: true,
    },
});

server.express.use(bodyParser.json());
server.express.use(cors());
server.express.use(helmet());
server.express.use(compression());

schema.middleware(ResourceCheckMiddleware);
