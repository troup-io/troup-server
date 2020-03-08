import { config } from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { applyMiddleware } from 'graphql-middleware';
import * as helmet from 'helmet';

import { PrismaClient } from '@prisma/client';

import { formatError } from '@lib/formatError';
import { formatResponse } from '@lib/formatResponse';
import { authorization } from '@lib/auth-middleware';

import { schema as baseSchema } from '@schema';
import { permissions } from '@permissions';

config();

const prisma = new PrismaClient();

const schema = applyMiddleware(baseSchema, permissions);

const server = new GraphQLServer({
    schema,
    async context({ request, response }) {
        return {
            request,
            response,
            prisma,
        };
    },
});

// server.express.use(bodyParser.json());
// server.express.use(bodyParser.urlencoded({ extended: true }));
server.express.use(helmet());
server.express.use(authorization());

server.options = {
    ...server.options,
    formatError,
    formatResponse,
    deduplicator: true,
};

server.start({ port: process.env.PORT }, () =>
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
