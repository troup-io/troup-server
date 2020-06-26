import { Context } from '../services/Context';
import { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';

export type Middleware = () => (
    root: any,
    args: any,
    context: Context,
    info: GraphQLResolveInfo,
    next: GraphQLFieldResolver<any, any>
) => void;
