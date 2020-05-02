import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { PrismaClient, UserGetPayload } from '@prisma/client';

export interface Context {
    request: ExpressContext['req'];
    response: ExpressContext['res'];
    connection?: ExpressContext['connection'];
    prisma: PrismaClient;
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
