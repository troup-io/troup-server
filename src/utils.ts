import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { GraphQLServer } from 'graphql-yoga';

import { PrismaClient, UserGetPayload } from '@prisma/client';

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

export function tokenSigner(userId: string, teamId = ''): string {
    return jwt.sign({ context: `${userId}.${teamId}` }, process.env.APP_SECRET);
}

export function tokenRetriever(token: string): { userId: string; teamId: string } {
    const result = jwt.verify(token as string, process.env.APP_SECRET) as any;

    return {
        userId: 'lol',
        teamId: 'haha',
    };
}

export async function checkPasswordMatch(
    user: UserGetPayload<{ select: { password: true } }>,
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
}

export function checkUserTeam(
    user: UserGetPayload<{ include: { teams: { select: { id: true } } } }>
): boolean {
    return !!user.teams.length;
}
