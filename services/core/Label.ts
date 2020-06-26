import { Provider, ServiceReturn, ServiceMutationArgs } from '../extenders/Provider';

import { randomPastel } from '../../utils';

export class Label extends Provider {
    public async create({
        value,
        color,
    }: ServiceMutationArgs<'createGlobalLabel'>): ServiceReturn<'Label'> {
        const { teamId } = this;

        return await this.prisma.label.create({
            data: {
                value,
                isGlobal: true,
                background: color || randomPastel(),
                team: {
                    connect: {
                        id: teamId,
                    },
                },
            },
        });
    }
}
