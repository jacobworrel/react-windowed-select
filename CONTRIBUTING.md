## Prerequisites

[Node.js](http://nodejs.org/) >= 12.13.0 must be installed.

## Installation

- Running `npm install` in the component's root directory will install everything you need for development.

## Storybook

- `npm run storybook` will run Storybook.

## Demo Development Server

- `npm start` will run a development server with the component's demo app at [http://localhost:8080](http://localhost:8080) with hot module reloading.

## Running Unit Tests

- `npm run test:cov` will run the unit tests once and produce a coverage report in `coverage/`.

## Running End to End Tests

- `npm run e2e:ci` will run the Cypress end to end tests against Storybook. Alternatively, you can run `npm run storybook` followed by `cypress open` to run the Cypress tests interactively in the Cypress app.

## Building

- `npm run build` will build the component for publishing to npm.
