import { ApolloError, AuthenticationError } from 'apollo-server-express';

import {
    Provider,
    ServiceMutationArgs,
    ServiceReturn,
    ServiceQueryArgs,
    ServiceArrayReturn,
} from '../extenders/Provider';

import { TeamErrors } from '../../errors/team.errors';

import { checkTeamUser } from '../../utils';

export class Team extends Provider {
    public async checkIfExists({
        teamName,
    }: ServiceMutationArgs<'checkTeamName'>): ServiceReturn<'Boolean'> {
        return !!(await this.prisma.team.count({ where: { name: teamName } }));
    }

    public async getAll(): ServiceArrayReturn<'Team'> {
        return await this.prisma.team.findMany({
            where: {
                OR: [
                    {
                        ownerId: this.userId,
                    },
                    {
                        members: {
                            some: {
                                id: this.userId,
                            },
                        },
                    },
                ],
            },
        });
    }

    public async teamDetailsFromName({
        name,
    }: ServiceQueryArgs<'teamDetailsFromName'>): ServiceReturn<'TeamAuthInfoData'> {
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

        if (!checkTeamUser(team, userId)) {
            throw new AuthenticationError(TeamErrors.INVALID_TEAM_ACCESS);
        }

        return team;
    }
}
