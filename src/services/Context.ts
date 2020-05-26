import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { PrismaClient } from '@prisma/client';

import { Provider } from './extenders/Provider';

import { Team } from './core/Team';
import { Auth } from './core/Auth';
import { Signin } from './core/Auth/Signin';
import { Signup } from './core/Auth/Signup';
import { User } from './core/User';

export type Context = {
    provider: Provider;
    auth: {
        core: Auth;
        signin: Signin;
        signup: Signup;
    };
    team: Team;
    user: User;
};

export type PrismaContext = Context & {
    prisma: PrismaClient;
};

export const ContextInit = (ctx: ServerContext): Context => {
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
    request: ExpressContext['req'];
    response: ExpressContext['res'];
    connection?: ExpressContext['connection'];
    prisma: PrismaClient;
}
