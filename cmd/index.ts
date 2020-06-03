#!/usr/bin/env node
import { resolve } from 'path';
import { execSync } from 'child_process';

import COMMANDS, { CommandItem } from './COMMANDS';

const [runner, subrunner] = process.argv.slice(2);

function runSingleCommand(command: CommandItem): void {
    const ROOT = resolve(__dirname, '../');
    const cwd = resolve(ROOT, command.cwd ?? '.');

    try {
        execSync(command.command, {
            stdio: 'inherit',
            cwd,
        });
        return;
    } catch (error) {
        process.exit(1);
    }
}

function commandRunnner(commands: CommandItem[]): void {
    if (commands.length) {
        for (const command of commands) {
            runSingleCommand(command);
        }
    }
}

// eslint-disable-next-line complexity
(function main(): void {
    const allCommands = Object.keys(COMMANDS);
    const availableCommands = allCommands.filter(cmd => cmd.includes(`${runner}:`));

    try {
        if (runner !== 'bootstrap' && runner !== 'reset' && !availableCommands.length) {
            throw 1;
        }

        if (runner === 'bootstrap') {
            const bootstrapCommands = Object.values(COMMANDS)
                .filter((command: CommandItem) => command.bsSeq)
                .sort((a: CommandItem, b: CommandItem) => a.bsSeq - b.bsSeq) as CommandItem[];

            commandRunnner(bootstrapCommands);
            return;
        }

        if (runner === 'reset') {
            const resetCommands = Object.values(COMMANDS)
                .filter((command: CommandItem) => command.rsSeq)
                .sort((a: CommandItem, b: CommandItem) => a.rsSeq - b.rsSeq) as CommandItem[];

            commandRunnner(resetCommands);
            return;
        }

        if (!subrunner) {
            throw 1;
        }

        if (subrunner) {
            const command: CommandItem = COMMANDS[`${runner}:${subrunner}`];

            if (command) {
                runSingleCommand(command);
                return;
            } else {
                throw 1;
            }
        }

        throw 1;
    } catch (error) {
        if (error === 1) {
            console.log('');
            console.log('No matching commands, or malformed arguments. Available commands are:');
            console.log(
                (availableCommands.length ? availableCommands : allCommands)
                    .map(cmd => `- ${cmd.replace(':', ' ')}\n`)
                    .join('')
            );
            console.log('');
        }
        process.exit(1);
    }
})();
