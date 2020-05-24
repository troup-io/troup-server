import { Application } from 'express';

import { PrismaClient } from '@prisma/client';

export { middlewareAuth } from './auth.middleware';
export { middlewareUser } from './user.middleware';

export function middlewareApplicator(
    app: Application,
    prisma: PrismaClient,
    middlewares: Array<
        | Function
        | [
              Function,
              {
                  path?: string;
                  options?: Record<string, any>;
                  shouldPass?: boolean;
                  devOnly?: boolean;
              }
          ]
    >
): void {
    middlewares
        .filter(middleware => {
            if (Array.isArray(middleware)) {
                const { devOnly = false } = middleware[1];
                if (!devOnly || (devOnly && process.env.NODE_ENV === 'development')) {
                    return true;
                }
                return false;
            }
        })
        .forEach(middleware => {
            if (!Array.isArray(middleware)) {
                app.use(middleware());
                return;
            } else {
                const [middlewareFunction, { shouldPass, path = '*', options = {} }] = middleware;

                if (shouldPass) {
                    app.use(path, middlewareFunction(prisma, options));
                } else {
                    app.use(path, middlewareFunction(options));
                }
            }
        });
}
