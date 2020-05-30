import { AuthenticationError } from 'apollo-server-express';

import { Provider, ServiceMutationArgs, ServiceReturn } from '../../extenders/Provider';

import { AuthErrors } from '../../../errors/auth.errors';

import { checkPasswordMatch, tokenSigner, checkUserTeam } from '../../../utils';

export class Signin extends Provider {
    public async signinUser({
        email,
        password,
    }: ServiceMutationArgs<'signinUser'>): ServiceReturn<'UserData'> {
        const user = await this.prisma.user.findOne({
            where: { email },
            include: {
                profile: true,
                memberTeams: {
                    select: {
                        id: true,
                        name: true,
                        displayName: true,
                    },
                },
                ownerTeams: {
                    select: {
                        id: true,
                        name: true,
                        displayName: true,
                    },
                },
            },
        });

        if (!user) {
            throw new AuthenticationError(AuthErrors.INVALID_EMAIL);
        }

        if (!(await checkPasswordMatch(user, password))) {
            throw new AuthenticationError(AuthErrors.INVALID_PASSWORD);
        }

        return {
            token: tokenSigner(user.id),
            user,
        };
    }

    public async signinTeam({
        email,
        password,
        teamId: id,
    }: ServiceMutationArgs<'signinTeam'>): ServiceReturn<'TeamSigninData'> {
        const user = await this.prisma.user.findOne({
            where: { email },
            include: {
                profile: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
                memberTeams: {
                    where: {
                        id,
                    },
                    select: {
                        id: true,
                        name: true,
                        displayName: true,
                    },
                },
                ownerTeams: {
                    where: {
                        id,
                    },
                    select: {
                        id: true,
                        name: true,
                        displayName: true,
                    },
                },
            },
        });

        if (!user) {
            throw new AuthenticationError(AuthErrors.INVALID_EMAIL);
        }

        if (!(await checkPasswordMatch(user, password))) {
            throw new AuthenticationError(AuthErrors.INVALID_PASSWORD);
        }

        if (!checkUserTeam(user)) {
            throw new AuthenticationError(AuthErrors.INVALID_TEAM_MEMBER);
        }

        return {
            token: tokenSigner(user.id),
            user,
        };
    }
}
