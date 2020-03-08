import { mutationType } from 'nexus';

import { UserMutation } from './User.mutations';

export const Mutation = mutationType({
    definition(t) {
        UserMutation(t);
    },
});
