import { shield, allow } from 'graphql-shield';

import { isAuthenticated } from './is-authenticated';

export const permissions = shield({
    Query: {
        '*': isAuthenticated,
    },
    Mutations: {
        '*': isAuthenticated,
        signin: allow,
        signup: allow,
    },
});
