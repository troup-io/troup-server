import { ObjectDefinitionBlock } from 'nexus/dist/core';

// import { Context } from 'utils';

export function UserMutations(t: ObjectDefinitionBlock<'Mutation'>): void {
    t.crud.deleteOneUser();
    t.crud.deleteOneUserProfile();
}
