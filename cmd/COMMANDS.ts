/**
 * The list of available commands in this project.
 * The sequence key is only used if the command is a bootstrap command or if it is a wildcard command.
 *
 * Additional commands and tasks can be found in .vscode/tasks.json or can be run directly from VS Code task runner.
 */

export interface Commands {
    [key: string]: CommandItem;
}

export interface CommandItem {
    command: string;
    cwd?: string;
    sequence?: number;
    bootstrap?: boolean;
}

export default {
    'db:start': {
        command: "docker-compose --project-name 'troup' up -d",
        cwd: 'prisma',
        sequence: 1,
        bootstrap: true,
    },
    'db:setup': {
        command: 'yarn prisma2 migrate up --experimental',
        sequence: 2,
        bootstrap: true,
    },
    'generate:client': {
        command: 'yarn prisma2 generate',
        sequence: 3,
        bootstrap: true,
    },
    'generate:typings': {
        command: 'ts-node -r tsconfig-paths/register -T src/schema',
        sequence: 4,
        bootstrap: true,
    },
    'app:start': {
        command: 'dotenv -- nodehawk',
    },
    'app:build': {
        command: 'rimraf dist && ttsc',
    },
    'app:lint': {
        command: 'eslint src --ext .ts,.json,.js',
    },
    semver: {
        command: 'npm version',
    },
    'semver:alpha': {
        command: 'npm version --prerelease="alpha"',
    },
    'semver:beta': {
        command: 'npm version --prerelease="beta"',
    },
};
