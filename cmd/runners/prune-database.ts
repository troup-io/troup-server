#!/usr/bin/env node

import { execSync } from 'child_process';

const commands = [
    'docker stop troup_pg_container_1',
    'docker rm troup_pg_container_1',
    'docker volume rm troup_pg_volume',
    'rimraf /var/lib/postgres/troup',
];

for (const command of commands) {
    execSync(command, {
        stdio: 'inherit',
    });
}
