import { mutationType } from 'nexus';

import { UserMutations } from './User.mutations';
import { TroupProfileMutations } from './TroupProfile.mutations';

export const Mutation = mutationType({
    definition(t) {
        UserMutations(t);
        TroupProfileMutations(t);
    },
});
