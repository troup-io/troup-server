import { shield, allow, chain } from 'graphql-shield';

import { isAuthenticated } from './is-authenticated';
import { isOwnResource } from './is-own-resource';

export const permissions = shield(
    {
        Query: {
            '*': chain(isAuthenticated, isOwnResource),
        },
        Mutation: {
            signup: allow,
            signin: allow,
            '*': chain(isAuthenticated, isOwnResource),
        },
    },
    {
        allowExternalErrors: true,
        debug: process.env.NODE_ENV === 'development',
    }
);
