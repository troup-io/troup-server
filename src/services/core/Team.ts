import { ApolloError } from 'apollo-server-express';

import {
    Provider,
    ServiceMutationArgs,
    ServiceReturn,
    ServiceQueryArgs,
} from 'services/extenders/Provider';

import { TeamErrors } from 'errors/team.errors';

export class Team extends Provider {
    public async checkIfExists({
        teamName,
    }: ServiceMutationArgs<'checkTeamName'>): Promise<ServiceReturn<'Boolean'>> {
        return !!(await this.prisma.team.count({ where: { name: teamName } }));
    }

    public async teamDetailsFromName({
        name,
    }: ServiceQueryArgs<'teamDetailsFromName'>): Promise<ServiceReturn<'TeamAuthInfoData'>> {
        const team = await this.prisma.team.findOne({
            where: { name },
            select: {
                id: true,
                name: true,
                displayName: true,
            },
        });

        if (!team) {
            throw new ApolloError(TeamErrors.INVALID_TEAM);
        }

        return team;
    }
}
