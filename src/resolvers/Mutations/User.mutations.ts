import { ObjectDefinitionBlock } from 'nexus/dist/core';

export function UserMutations(t: ObjectDefinitionBlock<'Mutation'>): void {
    t.crud.deleteOneUser();
    t.crud.deleteOneUserProfile();
}
