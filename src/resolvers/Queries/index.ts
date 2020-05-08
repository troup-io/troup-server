import { queryType } from 'nexus';

import { UserQueries } from './User.queries';
import { TeamQueries } from './Team.queries';

export const Query = queryType({
    definition(t) {
        UserQueries(t);
        TeamQueries(t);
    },
});
