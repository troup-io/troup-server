import { ServerContext } from '../Context';

import { getUserId, getTeamId } from '../../utils';

export class Provider {
    protected prisma: ServerContext['db'];
    protected request: ServerContext['request'];
    protected userId?: number;
    protected teamId?: number;

    constructor(ctx: ServerContext) {
        this.prisma = ctx.db;
        this.request = ctx.request;
        this.userId = this.getUserId();
        this.teamId = this.getTeamId();
    }

    public getHeader(key: keyof ServerContext['request']['headers']): string | string[] {
        return this.request.headers[key];
    }

    public getUserId = getUserId.bind(this);
    public getTeamId = getTeamId.bind(this);
}

type RootTypes = NexusGen['rootTypes'];
type RootKeys = Exclude<keyof RootTypes, 'Mutation' | 'Query'>;
type RootReturn<T extends RootKeys> = RootTypes[T];

export type ServiceReturn<T extends RootKeys> = Promise<RootReturn<T>>;

export type ServiceArrayReturn<T extends RootKeys> = Promise<Array<RootReturn<T>>>;

export type ServiceQueryArgs<
    T extends keyof NexusGen['argTypes']['Query']
> = NexusGen['argTypes']['Query'][T];

export type ServiceMutationArgs<
    T extends keyof NexusGen['argTypes']['Mutation']
> = NexusGen['argTypes']['Mutation'][T];
