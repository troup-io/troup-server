import { mutationType } from 'nexus';

import { AuthMutations } from './Auth.mutations';
import { UserMutations } from './User.mutations';
import { TeamMutations } from './Team.mutations';

export const Mutation = mutationType({
    definition(t) {
        AuthMutations(t);
        UserMutations(t);
        TeamMutations(t);
    },
});
