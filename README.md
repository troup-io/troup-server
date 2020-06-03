<p align="center"><img src="https://repository-images.githubusercontent.com/259775937/548b6b00-9a47-11ea-864f-a6d905f657c6" alt="troup-banner" width="300" /></p>

# Troup Server

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/troup) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com) [![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat)](https://www.firsttimersonly.com/)

> ### 📢 We are looking for contributors!
>
> This project is under heavy development and is on the lookout for contributors both technical and ono-technical. If you are interested in understanding the product and contributing, do get in touch at hello@troupapp.com.

The Troup client is the frontend app that helps the user address problems that we aim to solve. The client is built atop wonderful open-source projects with the goal of providing a fluid experience to the user.

**Languages:**

-   [Typescript][typescript]

**Libraries:**

-   [Apollo Server][apollo-server]
-   [Prisma][prisma]
-   [Nexus Schema][nexus-schema]

## Available scripts

### `yarn boostrap`

Bootstrap the database and the server. This will also seed your local database.

### `yarn dev`

Start the development server and watch for file changes.

### `yarn build`

Build the production-optimised bundle for deployment.

### `yarn start`

Deploy the production-optimised bundle locally to test and simulate the production environment.

### `yarn lint`

Run the linter, catching out any errors or warning that may occur.

### `yarn cmd`

The raw command runner. All commands that are listed as `category:command` can be run using `yarn cmd category command`.
For example, the [`app:dev`][app-dev] command can run as `yarn cmd app dev`.

### UNSAFE: `yarn reset`

Use this if something has gone horribly wrong with your database. It wipes out all data, clears out all volumes and containers and restarts a new container.

Resources: [Available Commands][commands]

[typescript]: https://www.typescriptlang.org/
[apollo-server]: https://www.apollographql.com/docs/apollo-server
[prisma]: https://www.prisma.io
[nexus-schema]: https://github.com/graphql-nexus/schema
[commands]: https://github.com/troup-io/troup-server/blob/master/cmd/COMMANDS.ts
[app-dev]: https://github.com/troup-io/troup-server/blob/master/cmd/COMMANDS.ts#L45
