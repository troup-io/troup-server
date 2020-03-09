import * as bcrypt from 'bcryptjs';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { GraphQLServer } from 'graphql-yoga';

import { PrismaClient, UserGetSelectPayload } from '@prisma/client';

export interface Context {
    prisma: PrismaClient;
    request: ContextParameters['request'];
    response: ContextParameters['response'];
}

export function middlewareApplicator(server: GraphQLServer, prisma: Context['prisma']): Function {
    return function customMiddlewareApplier(middleware: Function, shouldPass?: boolean): void {
        if (shouldPass) {
            server.express.use(middleware(prisma));
            return;
        }

        server.express.use(middleware());
    };
}

export async function checkPasswordMatch(
    user: UserGetSelectPayload<{ password: true }>,
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
}

export function checkUserTroup(user: UserGetSelectPayload<{ troups: true }>): boolean {
    return !!user.troups.length;
}
