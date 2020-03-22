import { config } from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { applyMiddleware } from 'graphql-middleware';
import * as helmet from 'helmet';

import { PrismaClient } from '@prisma/client';

import { formatError } from 'lib/formatError';
import { formatResponse } from 'lib/formatResponse';
import { middleware_Auth, middleware_User } from 'middlewares';

import { schema as baseSchema } from 'schema';
import { permissions } from 'permissions';

import { middlewareApplicator, Context } from 'utils';

config();

const prisma = new PrismaClient();

const schema = applyMiddleware(baseSchema, permissions);

const server = new GraphQLServer({
    schema,
    context({ request, response }): Context {
        return {
            request,
            response,
            prisma,
        };
    },
});

// server.express.use(bodyParser.json());
// server.express.use(bodyParser.urlencoded({ extended: true }));
const useMiddleware = middlewareApplicator(server, prisma);
useMiddleware(helmet);
useMiddleware(middleware_Auth, true);
useMiddleware(middleware_User, true);

server.options = {
    ...server.options,
    formatError,
    formatResponse,
    deduplicator: true,
};

server.start({ port: process.env.PORT }, () =>
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
