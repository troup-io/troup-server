import { Provider, ServiceQueryArgs, ServiceReturn } from '../extenders/Provider';

export class User extends Provider {
    public async checkIfExists({
        email,
    }: ServiceQueryArgs<'checkIfUserExists'>): Promise<ServiceReturn<'Boolean'>> {
        return await !!(await this.prisma.user.count({ where: { email } }));
    }

    public async userDetails(): Promise<ServiceReturn<'User'>> {
        const id = this.getUserId();

        return await this.prisma.user.findOne({
            where: { id },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                profile: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }

    public async getUserTeams(): Promise<ServiceReturn<'UserTeamDetails'>> {
        const id = this.getUserId();

        const teams = await this.prisma.team.findMany({
            where: {
                OR: {
                    members: {
                        some: {
                            id,
                        },
                    },
                    ownerId: id,
                },
            },
        });

        return teams;
    }
}
