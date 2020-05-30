import { ServerContext } from '../Context';

import { tokenRetriever } from '../../utils';

export class Provider {
    protected prisma: ServerContext['prisma'];
    protected request: ServerContext['request'];

    constructor(ctx: ServerContext) {
        this.prisma = ctx.prisma;
        this.request = ctx.request;
    }

    public getHeader(key: keyof ServerContext['request']['headers']): string | string[] {
        return this.request.headers[key];
    }

    public getUserId(): number {
        if (this.request.headers.authorization) {
            const { userId } = tokenRetriever(this.request.headers.authorization);
            return userId;
        }

        return null;
    }
}

export type ServiceReturn<T extends keyof NexusGen['rootTypes']> = NexusGen['rootTypes'][T];

export type ServiceReturnPick<
    T extends keyof NexusGen['rootTypes'],
    K extends keyof NexusGen['rootTypes'][T]
> = Pick<ServiceReturn<T>, K>;

export type ServiceQueryArgs<
    T extends keyof NexusGen['argTypes']['Query']
> = NexusGen['argTypes']['Query'][T];

export type ServiceMutationArgs<
    T extends keyof NexusGen['argTypes']['Mutation']
> = NexusGen['argTypes']['Mutation'][T];
