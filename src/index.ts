import { GraphQLServer } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';

import { schema } from './schema';

const prisma = new PrismaClient();

const server = new GraphQLServer({
    schema,
    context: request => ({
        ...request,
        prisma,
    }),
});

server.start({ port: process.env.PORT }, () =>
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
