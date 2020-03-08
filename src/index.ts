import { config } from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { PrismaClient } from '@prisma/client';
import * as helmet from 'helmet';
// import { rule, shield, and, or, not } from 'graphql-shield';
// import * as bodyParser from 'body-parser';
import { ClientRequestArgs } from 'http';
import * as jwt from 'jsonwebtoken';

import { formatError } from 'lib/formatError';
import { formatResponse } from 'lib/formatResponse';

import { schema } from './schema';

config();

const prisma = new PrismaClient();

const server = new GraphQLServer({
    schema,
    async context({ request }) {
        const { bearer } = request.headers;
        let user = null;

        if (bearer) {
            const { userId } = jwt.verify(bearer as string, process.env.APP_SECRET) as any;

            if (userId) {
                user = await prisma.user.findOne({ where: { id: userId } });
            }
        }

        return {
            ...request,
            prisma,
            user,
        };
    },
});

// server.express.use(bodyParser.json());
// server.express.use(bodyParser.urlencoded({ extended: true }));
server.express.use(helmet());

server.options = {
    ...server.options,
    formatError,
    formatResponse,
};

server.start({ port: process.env.PORT }, () =>
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
