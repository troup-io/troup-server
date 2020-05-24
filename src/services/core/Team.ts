import {
    Provider,
    ServiceMutationArgs,
    ServiceReturn,
    ServiceQueryArgs,
} from 'services/extenders/Provider';
import { ApolloError } from 'apollo-server-express';

export class Team extends Provider {
    public async checkIfExists({
        teamName,
    }: ServiceMutationArgs<'checkTeamName'>): Promise<ServiceReturn<'Boolean'>> {
        return !!(await this.prisma.team.count({ where: { name: teamName } }));
    }

    public async teamDetailsFromName({
        name,
    }: ServiceQueryArgs<'teamDetailsFromName'>): Promise<ServiceReturn<'TeamAuthInfoData'>> {
        if (!name) {
            throw new ApolloError('Please provide an ID or name to query the team by.');
        }

        const team = await this.prisma.team.findOne({
            where: { name },
            select: {
                id: true,
                name: true,
                displayName: true,
            },
        });

        if (!team) {
            throw new ApolloError('No such team exists.');
        }

        return team;
    }
}
