import { Label, PrismaClient } from 'nexus-plugin-prisma/client';

import { randomPastel } from './';

type LabelConnectors = {
    connect: Pick<Label, 'id'>[];
    create: Pick<Label, 'value' | 'foreground' | 'background'>[];
};

export async function sequenceAndLabels({
    teamId,
    projectId,
    labels,
}): Promise<{
    sequence: number;
    labelConnectors: LabelConnectors;
}> {
    const prisma = this.prisma as PrismaClient;
    const sequence =
        (projectId
            ? await prisma.ticket.count({
                  where: {
                      projectId,
                  },
              })
            : await prisma.project.count({
                  where: {
                      teamId,
                  },
              })) + 1;

    let labelConnectors = {
        connect: [],
        create: [],
    };

    if (projectId > 0 && labels.length) {
        const existingLabels = await prisma.label.findMany({
            where: {
                ...(projectId
                    ? {
                          OR: [
                              {
                                  projectId,
                              },
                              {
                                  isGlobal: true,
                              },
                          ],
                      }
                    : {
                          isGlobal: true,
                      }),
            },
            select: {
                id: true,
                value: true,
            },
        });

        labelConnectors = labels.reduce((acc, label) => {
            const existingLabel = existingLabels.find(
                existingLabel => existingLabel.value === label
            );
            if (existingLabel) {
                acc.connect.push({
                    id: existingLabel.id,
                });
            } else {
                acc.create.push({
                    value: label,
                    background: randomPastel(),
                    team: {
                        connect: {
                            id: teamId,
                        },
                    },
                    project: {
                        connect: {
                            id: projectId,
                        },
                    },
                });
            }

            return acc;
        }, labelConnectors);
    }

    return {
        sequence,
        labelConnectors,
    };
}
