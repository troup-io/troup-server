import {
    Provider,
    ServiceQueryArgs,
    ServiceReturn,
    ServiceArrayReturn,
} from '../extenders/Provider';

export class User extends Provider {
    public async checkIfExists({
        email,
    }: ServiceQueryArgs<'checkIfUserExists'>): ServiceReturn<'Boolean'> {
        return !!(await this.prisma.user.count({ where: { email } }));
    }

    public async userDetails(): ServiceReturn<'UserDetails'> {
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

    public async getUserTeams(): ServiceArrayReturn<'UserTeamDetails'> {
        const id = this.getUserId();

        return await this.prisma.team.findMany({
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
            select: {
                id: true,
                name: true,
                displayName: true,
            },
        });
    }
}
