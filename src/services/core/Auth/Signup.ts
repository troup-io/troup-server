import * as bcrypt from 'bcryptjs';

import { Provider, ServiceMutationArgs, ServiceReturn } from 'services/extenders/Provider';

import { tokenSigner } from 'utils';

export class Signup extends Provider {
    public async signupUser({
        email,
        password,
        firstName,
        lastName,
        teamId,
    }: ServiceMutationArgs<'signupUser'>): Promise<ServiceReturn<'UserData'>> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                profile: {
                    create: {
                        firstName,
                        lastName,
                    },
                },
                memberTeams: {
                    connect: {
                        id: teamId,
                    },
                },
            },
        });

        return {
            user,
            token: tokenSigner(user.id),
        };
    }

    public async signupTeam({
        email,
        password,
        firstName,
        lastName,
        teamName,
    }: ServiceMutationArgs<'signupTeam'>): Promise<ServiceReturn<'TeamSignupData'>> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const { owner, ...team } = await this.prisma.team.create({
            data: {
                name: teamName,
                owner: {
                    create: {
                        email,
                        password: hashedPassword,
                        profile: {
                            create: {
                                firstName,
                                lastName,
                            },
                        },
                    },
                },
            },
            include: {
                owner: true,
            },
        });

        return {
            user: owner,
            team,
            token: tokenSigner(owner.id),
        };
    }
}
