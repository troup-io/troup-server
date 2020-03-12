import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { GraphQLServer } from 'graphql-yoga';

import { PrismaClient, UserGetPayload, UserArgs, Troup } from '@prisma/client';

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

export function tokenSigner(userId: string, troupId = ''): string {
    return jwt.sign({ context: `${userId}.${troupId}` }, process.env.APP_SECRET);
}

export function tokenRetriever(token: string): { userId: string; troupId: string } {
    const result = jwt.verify(token as string, process.env.APP_SECRET) as any;
    // const [userId, troupId = ''] = result.context.split('.');

    return {
        userId: 'lol',
        troupId: 'haha',
    };
}

export async function checkPasswordMatch(
    userPassword: UserGetPayload<UserArgs['select']['password']>['password'],
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
}

export function checkUserTroup(troups: Troup[]): boolean {
    return !!troups.length;
}
