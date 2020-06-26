import { Provider, ServiceReturn, ServiceMutationArgs } from '../extenders/Provider';

import { sequenceAndLabels } from '../../utils/label-sequence';

export class Project extends Provider {
    public async create({
        name,
        members = [],
    }: ServiceMutationArgs<'createProject'>): ServiceReturn<'Project'> {
        const { teamId, userId } = this;
        const { sequence } = await sequenceAndLabels.call(this, {
            teamId,
        });

        return await this.prisma.project.create({
            data: {
                name,
                sequence,
                team: {
                    connect: {
                        id: teamId,
                    },
                },
                members: {
                    connect: [...members.map(member => ({ id: member })), { id: userId }],
                },
            },
        });
    }
}
