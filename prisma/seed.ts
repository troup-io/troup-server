export type SeedUser = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

export default [
    {
        email: 'john@troup.io',
        password: 'test',
        firstName: 'John',
        lastName: 'Doe',
    },
    {
        email: 'jane@troup.io',
        password: 'test',
        firstName: 'Jane',
        lastName: 'Doe',
    },
    {
        email: 'homer@troup.io',
        password: 'test',
        firstName: 'Homer',
        lastName: 'Doenut',
    },
    {
        email: 'marge@troup.io',
        password: 'test',
        firstName: 'Marge',
        lastName: 'Doenut',
    },
] as SeedUser[];
