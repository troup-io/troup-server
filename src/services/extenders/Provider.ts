import { ServerContext } from '../Context';

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
}

export type ServiceReturn<T extends keyof NexusGen['rootTypes']> = NexusGen['rootTypes'][T];

export type ServiceQueryArgs<
    T extends keyof NexusGen['argTypes']['Query']
> = NexusGen['argTypes']['Query'][T];

export type ServiceMutationArgs<
    T extends keyof NexusGen['argTypes']['Mutation']
> = NexusGen['argTypes']['Mutation'][T];
