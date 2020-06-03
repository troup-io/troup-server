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
    bsSeq?: number;
    rsSeq?: number;
}

export default {
    'db:start': {
        command: "docker-compose --project-name 'troup' up -d",
        cwd: 'prisma',
        bsSeq: 1,
        rsSeq: 2,
    },
    'db:setup': {
        command: 'yarn prisma migrate up --experimental',
        bsSeq: 2,
        rsSeq: 3,
    },
    'db:clean': {
        command: './node_modules/.bin/ts-node cmd/runners/prune-database',
        rsSeq: 1,
    },
    'app:dev': {
        command: 'dotenv -- nodehawk',
    },
    'app:start': {
        command: 'rimraf dist && ttsc && node ./dist/server.js',
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
