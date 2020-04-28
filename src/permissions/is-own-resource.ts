import { rule } from 'graphql-shield';

// import { Context } from 'utils';

export const isOwnResource = rule({
    cache: 'contextual',
})((parent, args): boolean => {
    console.log('parent', parent);
    console.log('args', args);
    return true;
});
