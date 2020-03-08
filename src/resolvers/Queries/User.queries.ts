import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';

// import { Context } from 'utils';

export function UserQueries(t: ObjectDefinitionBlock<'Query'>) {
    t.crud.user();
    t.crud.users({ ordering: true, filtering: true });
}
