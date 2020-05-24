import { Provider, ServiceQueryArgs, ServiceReturn } from 'services/extenders/Provider';

export class User extends Provider {
    public async checkIfExists({
        email,
    }: ServiceQueryArgs<'checkIfUserExists'>): Promise<ServiceReturn<'Boolean'>> {
        return await !!(await this.prisma.user.count({ where: { email } }));
    }
}
