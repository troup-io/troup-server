import { queryType } from 'nexus';

import { UserQueries } from './User.queries';

export const Query = queryType({
    definition(t) {
        UserQueries(t);
    },
});
