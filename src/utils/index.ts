import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserGetPayload, TeamGetPayload } from '@prisma/client';

export function tokenSigner(userId: number): string {
    return jwt.sign({ userId }, process.env.APP_SECRET, {
        expiresIn: '2 days',
    });
}

export function tokenRetriever(bearerToken: string, ignoreExpiration = false): { userId: number } {
    const token = bearerToken.split('Bearer ').pop();

    if (token && token !== 'null') {
        console.log('in if!');
        const { userId } = jwt.verify(token as string, process.env.APP_SECRET, {
            ignoreExpiration,
        }) as any;

        return {
            userId: parseInt(userId, 10),
        };
    }

    return {
        userId: null,
    };
}

export async function checkPasswordMatch(
    user: UserGetPayload<{ select: { password: true } }>,
    password: string
): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
}

export function checkUserTeam(
    user: UserGetPayload<{
        include: { memberTeams: { select: { id: true } }; ownerTeams: { select: { id: true } } };
    }>
): boolean {
    return !!user.memberTeams.length || !!user.ownerTeams.length;
}

export function checkTeamUser(
    team: TeamGetPayload<{
        select: {
            members: {
                select: {
                    id: true;
                };
            };
            owner: {
                select: { id: true };
            };
        };
    }>,
    userId: number
): boolean {
    return !!team.members.length || team.owner.id === userId;
}
