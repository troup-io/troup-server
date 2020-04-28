import { mutationType } from 'nexus';

import { UserMutations } from './User.mutations';
import { TeamMutations } from './Team.mutations';

export const Mutation = mutationType({
    definition(t) {
        UserMutations(t);
        TeamMutations(t);
    },
});
