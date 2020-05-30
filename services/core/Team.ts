import { ApolloError, AuthenticationError } from 'apollo-server-express';

import {
    Provider,
    ServiceMutationArgs,
    ServiceReturn,
    ServiceQueryArgs,
} from '../extenders/Provider';

import { TeamErrors } from '../../errors/team.errors';

import { checkTeamUser } from '../../utils';

export class Team extends Provider {
    public async checkIfExists({
        teamName,
    }: ServiceMutationArgs<'checkTeamName'>): Promise<ServiceReturn<'Boolean'>> {
        return !!(await this.prisma.team.count({ where: { name: teamName } }));
    }

    public async teamDetailsFromName({
        name,
    }: ServiceQueryArgs<'teamDetailsFromName'>): Promise<ServiceReturn<'TeamAuthInfoData'>> {
        const userId = this.getUserId();

        let team;

        if (userId) {
            team = await this.prisma.team.findOne({
                where: { name },
                select: {
                    id: true,
                    name: true,
                    displayName: true,
                    members: {
                        where: { id: userId },
                        select: {
                            id: true,
                        },
                    },
                    owner: {
                        select: { id: true },
                    },
                },
            });
        } else {
            team = await this.prisma.team.findOne({
                where: { name },
                select: {
                    id: true,
                    name: true,
                    displayName: true,
                },
            });
        }

        if (!team) {
            throw new ApolloError(TeamErrors.INVALID_TEAM);
        }

        if (typeof userId === 'number' && !checkTeamUser(team, userId)) {
            throw new AuthenticationError(TeamErrors.INVALID_TEAM_ACCESS);
        }

        return team;
    }
}
