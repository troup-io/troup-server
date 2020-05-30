import { UserInputError } from 'apollo-server-express';

import { Provider, ServiceReturn } from '../../extenders/Provider';

import { checkPasswordMatch, tokenSigner, checkUserTeam } from '../../../utils';

export class Auth extends Provider {
    public async signinUser({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<ServiceReturn<'UserData'>> {
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
            throw new UserInputError(`No such user found for email: ${email}`);
        }

        if (!(await checkPasswordMatch(user, password))) {
            throw new UserInputError('Invalid password');
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
    }: {
        email: string;
        password: string;
        teamId: number;
    }): Promise<ServiceReturn<'TeamSigninData'>> {
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
            throw new Error(`No such user found for email: ${email}`);
        }

        if (!checkUserTeam(user)) {
            throw new Error(`User (${email}) is not a member of this team.`);
        }

        if (!(await checkPasswordMatch(user, password))) {
            throw new Error('Invalid password');
        }

        return {
            token: tokenSigner(user.id),
            user,
        };
    }
}
