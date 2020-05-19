import { config } from 'dotenv';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { applyMiddleware } from 'graphql-middleware';
import * as helmet from 'helmet';
import compression from 'compression';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

import { PrismaClient } from '@prisma/client';

import { formatError } from 'lib/formatError';
import { middlewareApplicator, middlewareAuth, middlewareUser } from 'middlewares';

import { schema as baseSchema } from 'schema';
import { permissions } from 'permissions';

import { Context } from 'utils';

config();

const prisma = new PrismaClient();

const schema = applyMiddleware(baseSchema, permissions);

const server = new ApolloServer({
    schema,
    context({ req: request, res: response, connection }): Context {
        return {
            request,
            response,
            connection,
            prisma,
        };
    },
    formatError,
});

const app: express.Application = express();
middlewareApplicator(app, prisma, [
    helmet,
    compression,
    [
        voyagerMiddleware,
        {
            path: '/voyager',
            devOnly: true,
            options: {
                endpointUrl: '/graphql',
            },
        },
    ],
    [middlewareAuth, { shouldPass: true }],
    [middlewareUser, { shouldPass: true }],
]);

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () =>
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
