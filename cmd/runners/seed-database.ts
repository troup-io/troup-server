/* eslint-disable camelcase */

import { PrismaClient } from 'nexus-plugin-prisma/client';
import { config } from 'dotenv';
import * as bcrypt from 'bcryptjs';

import users from '../../prisma/seed';

config();
const prisma = new PrismaClient();

console.log('Starting seed..');
(async function(): Promise<void> {
    try {
        const adminHashedPassword = await bcrypt.hash('admin', 10);
        const adminUser = await prisma.user.create({
            data: {
                email: 'admin@troup.io',
                password: adminHashedPassword,
                profile: {
                    create: {
                        firstName: 'Admin',
                        lastName: 'User',
                        isSuperAdmin: true,
                        professionalCompetence: 'Admin',
                        utm_campaign: 'Seed',
                        utm_source: 'Seed',
                        utm_content: 'Seed user',
                        utm_medium: 'Seed',
                        utm_term: 'SEED',
                    },
                },
                ownerTeams: {
                    create: {
                        name: 'Troup',
                        displayName: '#TeamTroup',
                        adminEmail: 'hello@troupapp.com',
                    },
                },
            },
            select: {
                ownerTeams: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        console.log('Created admin and default team!');
        console.log('Creating users..');

        const teamId = adminUser.ownerTeams[0].id;

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await prisma.user.create({
                data: {
                    email: user.email,
                    password: hashedPassword,
                    profile: {
                        create: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                        },
                    },
                    memberTeams: {
                        connect: {
                            id: teamId,
                        },
                    },
                },
            });

            console.log(`Created user ${user.email}`);
        }

        console.log(`Created ${users.length} users as memebrs of default team!\n`);
        process.exit(0);
    } catch (error) {
        console.log(error);
        throw error;
    }
})();

process.on('unhandledRejection', () => {
    return;
});
