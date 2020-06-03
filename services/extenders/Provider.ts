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

type RootTypes = NexusGen['rootTypes'];
type RootKeys = Exclude<keyof RootTypes, 'Mutation' | 'Query'>;
type RootReturn<T extends RootKeys> = RootTypes[T];

export type ServiceReturn<T extends RootKeys, K = boolean> = Promise<
    K extends true ? RootReturn<T> : Array<RootReturn<T>>
>;

export type ServiceArrayReturn<T extends RootKeys> = Promise<Array<RootReturn<T>>>;

export type ServiceQueryArgs<
    T extends keyof NexusGen['argTypes']['Query']
> = NexusGen['argTypes']['Query'][T];

export type ServiceMutationArgs<
    T extends keyof NexusGen['argTypes']['Mutation']
> = NexusGen['argTypes']['Mutation'][T];
