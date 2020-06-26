import { Request } from 'nexus/dist/runtime/schema/schema';

import { Provider } from './extenders/Provider';

import { Team } from './core/Team';
import { Auth } from './core/Auth';
import { Signin } from './core/Auth/Signin';
import { Signup } from './core/Auth/Signup';
import { User } from './core/User';
import { Project } from './core/Project';
import { Ticket } from './core/Ticket';
import { Label } from './core/Label';

export type PartialContext = {
    request: Request;
    provider: Provider;
    auth: {
        core: Auth;
        signin: Signin;
        signup: Signup;
    };
    team: Team;
    user: User;
    project: Project;
    ticket: Ticket;
    label: Label;
};

export type Context = NexusContext & PartialContext;

export const ContextInit = (ctx: ServerContext): PartialContext => {
    return {
        request: ctx.request,
        provider: new Provider(ctx),
        auth: {
            core: new Auth(ctx),
            signin: new Signin(ctx),
            signup: new Signup(ctx),
        },
        team: new Team(ctx),
        user: new User(ctx),
        project: new Project(ctx),
        ticket: new Ticket(ctx),
        label: new Label(ctx),
    };
};

export interface ServerContext {
    db: NexusContext['db'];
    request: Request;
}
