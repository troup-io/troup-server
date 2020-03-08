import * as bcrypt from 'bcryptjs';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { PrismaClient, User, UserGetSelectPayload, Troup } from '@prisma/client';

export interface Context {
    prisma: PrismaClient;
    request: ContextParameters['request'];
    response: ContextParameters['response'];
    user?: User;
}

export async function checkPasswordMatch(
    user: UserGetSelectPayload<{ password: true }>,
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
}

export function checkUserTroup(
    user: UserGetSelectPayload<{ troups: true }>,
    troupId: string
): boolean {
    return user.troups.some(troup => troup.id === troupId);
}
