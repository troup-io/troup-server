import { Request } from 'nexus/dist/runtime/schema/schema';
import { PrismaClient } from '@prisma/client';

import { Provider } from './extenders/Provider';

import { Team } from './core/Team';
import { Auth } from './core/Auth';
import { Signin } from './core/Auth/Signin';
import { Signup } from './core/Auth/Signup';
import { User } from './core/User';

export type PartialContext = {
    provider: Provider;
    auth: {
        core: Auth;
        signin: Signin;
        signup: Signup;
    };
    team: Team;
    user: User;
};

export type Context = NexusContext & PartialContext;

export const ContextInit = (ctx: ServerContext): PartialContext => {
    return {
        provider: new Provider(ctx),
        auth: {
            core: new Auth(ctx),
            signin: new Signin(ctx),
            signup: new Signup(ctx),
        },
        team: new Team(ctx),
        user: new User(ctx),
    };
};

export interface ServerContext {
    request: Request;
    prisma: PrismaClient;
}
