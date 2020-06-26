import { AuthenticationError } from 'apollo-server-express';

import { Provider, ServiceReturn, ServiceMutationArgs } from '../extenders/Provider';

import { AuthErrors } from '../../errors/auth.errors';

import { sequenceAndLabels } from '../../utils/label-sequence';

export class Ticket extends Provider {
    public async create({
        projectId,
        title,
        body,
        labels,
    }: ServiceMutationArgs<'createTicket'>): ServiceReturn<'Ticket'> {
        const { teamId, userId } = this;

        const resourceValid = await this.prisma.project.count({
            where: {
                AND: [
                    {
                        id: projectId,
                    },
                    {
                        teamId,
                    },
                    {
                        members: {
                            some: {
                                id: userId,
                            },
                        },
                    },
                ],
            },
        });

        if (!resourceValid) {
            throw new AuthenticationError(AuthErrors.PROJECT_ACCESS_DENIED);
        }

        const { sequence, labelConnectors } = await sequenceAndLabels.call(this, {
            labels,
            projectId,
            teamId,
        });

        return await this.prisma.ticket.create({
            data: {
                title,
                body,
                sequence,
                labels: labelConnectors,
                team: {
                    connect: {
                        id: teamId,
                    },
                },
                author: {
                    connect: { id: userId },
                },
                project: {
                    connect: { id: projectId },
                },
            },
        });
    }
}
