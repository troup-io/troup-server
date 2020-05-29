import { ServerContext } from '../Context';

import { tokenRetriever } from 'utils';

export class Provider {
    protected prisma: ServerContext['prisma'];
    protected request: ServerContext['request'];
    protected response: ServerContext['response'];
    protected connection: ServerContext['connection'];

    constructor(ctx: ServerContext) {
        this.prisma = ctx.prisma;
        this.request = ctx.request;
        this.response = ctx.response;
        this.connection = ctx.connection;
    }

    public getHeader(key: keyof ServerContext['request']['headers']): string | string[] {
        return this.request.headers[key];
    }

    public getUserId(): number {
        console.dir(this.request.headers.authorization);
        if (this.request.headers.authorization) {
            const { userId } = tokenRetriever(this.request.headers.authorization);
            return userId;
        }

        return null;
    }
}

export type ServiceReturn<T extends keyof NexusGen['rootTypes']> = NexusGen['rootTypes'][T];

export type ServiceQueryArgs<
    T extends keyof NexusGen['argTypes']['Query']
> = NexusGen['argTypes']['Query'][T];

export type ServiceMutationArgs<
    T extends keyof NexusGen['argTypes']['Mutation']
> = NexusGen['argTypes']['Mutation'][T];
