import { ObjectDefinitionBlock } from 'nexus/dist/core';

import { SigninMutations } from './Signin.mutations';
import { SignupMutations } from './Signup.mutations';

export function AuthMutations(t: ObjectDefinitionBlock<'Mutation'>): void {
    SigninMutations(t);
    SignupMutations(t);
}
