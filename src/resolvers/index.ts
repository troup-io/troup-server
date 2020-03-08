import * as Models from './Models';
import * as Query from './Queries';
import * as Mutation from './Mutations';
import * as Types from './Types';
// import * as Subscription from './Subscriptions';

export default {
    Query,
    Mutation,
    // Subscription,
    ...Models,
    ...Types,
};
