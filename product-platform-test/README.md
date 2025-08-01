# `cypress-test-framework`
This project directory contains an example Cypress project

## Setup

1. Run `npm i`
2. Run `npm run prepare`
3. Copy the `cypress.env.json.example` file and rename it into `cypress.env.json`. Add values for the `email` and `password` parameters. `email` and `password` should be a valid email and password combination for an SDM user in the environment selected.

If you're in a non Windows device please run the following commands as well:
1. Run `chmod ug+x .husky/*`
2. Run `chmod ug+x .git/hooks/*`

## Available Scripts

1. `npm run cy:open` Open cypress launchpad. Select E2E testing followed by the browser you wish to test on. Afterwards you should see a list of spec files, select the one you wish to run. Cypress open is recommended for developing and troubleshooting tests. For more information see: [Cypress LaunchPad](https://docs.cypress.io/guides/getting-started/opening-the-app#The-Launchpad)

2. `npm run cy:run` Run multiple tests at once. This will run all tests that match the following pattern `cypress/e2e/**/*.cy.ts`. If you wish to run a different set of tests modify the the value of the `--spec` flag for this script in `package.json`. For more information see: [Cypress Run CLI Options](https://docs.cypress.io/guides/guides/command-line#cypress-run).

4. `npm run cy:record` Same as `npm run cy:run` but it will record the run in [Cypress Cloud](https://docs.cypress.io/guides/cloud/introduction). Use when running tests where we want to record the results (regression/sanity/dependency testing). Please avoid recording tests when developing troubleshooting since we have a limited about of tests that we can record and that limit is shared across the organization. Please keep in mind that you will need a record key in your enviromental variables to use this command. Please see [Cloud Setup](./README.md#cloud-setup) for instructions.

5. `npm run cy:debug` Same as `npm run cy:run` but it will output full debug statements to the console as well as record the complete console output in a file called `console_output.txt`. Use when something is not working correctly with Cypress in order to troubleshoot. For more information see: [Cypress Print Debug Logs](https://docs.cypress.io/guides/references/troubleshooting#Print-DEBUG-logs)

6. `npm run lint` Runs the linter and automatically attemp to fix any issues for all files in the repository. See [ESLint](./README.md#eslint) section for more information.

### CLI Parameters
The following CLI parameters can be passed to the commands above to further specify what test cases to run and in which environment.

1. `ENV`: This parameter sets which env to run the tests on. Valid values are `dev | qa | perf | stage | prod`. Passing an invalid value or no value at all will default the parameter to `dev`. Example: `ENV=qa npm run cy:open`.

2. `TAGS`: This parameter sets which test cases to run. Passing a `TAGS` value will make it so only test cases which have a matching tag will run. If no value is provided all tests will run. This parameter only works when running via `npm run cy:run`, providing a `TAGS` value while running via `npm run cy:open` will do nothing. For more information about this functionality please see [Cypress grep](./README.md#cypress-grep). Example: `TAGS=@Sanity npm run cy:run`

### Cloud Setup
The following steps assume you already have a Cypress Cloud account and are part of the organization. If this is not the case please ask your team lead for help. The following configuration will only last while the terminal is open. Recorded runs should be ran through CI pipelines rather than locally.

1. Go to the your cypress cloud project

2. Scroll down on the settings page until you see the record keys section

3. Click on the copy button next to the record key

4. On your terminal run the following command `export CYPRESS_RECORD_KEY=<recordKey>` where `<recordKey>` is the key you just copied over from the settings page.

5. Now you should be able to execute a recorded run by using the `cy:record` script. If the tests run succesfully you should be able to look at the results over on the Cypress Cloud dashboard.

`Please keep in mind that the record key is a sensitive credential and should not be shared through insecure channels, such as email, teams, or any other plain text communication. In the case the key is compromised please notify your team lead so that they can rotate the key.`


## What's included

### Custom example tests
Located in `./cypress/e2e/custom-examples` these tests are provided by the contributors of this repository to demostrate useful patterns not covered by the default examples.

|File Name| Description|
|:--------|:-----------|
|sign_in_example.cy.ts|Example of how to perform a login through the app utilzing the built in page objects |
|session_example.cy.ts|Example of how to initiate a session and how subsequent tests are affected after a session is in use|

### Cypress grep
We use [Cypress grep](https://github.com/cypress-io/cypress/tree/develop/npm/grep) to add custom tags to test cases and allows for the filtering of test cases based on their tags. This only works when running via `npm run cy:run`, it will not work when running via Cypress LaunchPad.

### Page objects
Located in `./cypress/pages` these are examples of page objects to be utilized during tests.

### Tests report
When running via `npm run cy:run` Cypress will generate junit .xml and mochawesome .json & .html report files at `./results`. This directory will be automatically created if it doesn't already exist. Cypress generates individual reports for every spec file that need to be merged into a single file to obtain a complete report for the tests executed. The indivdual reports are saved to `./results/temp`, these files will be deleted at the beginning of every run to avoid files from previous runs being merged. The merged report is saved to `./results/merged`, the file name includes a timestamp to avoid overwritting old results. All the logic and configuration for generating these reports is located in the `./reporterUtils.ts` file.

### ESLint
We use [eslint](https://eslint.org/) and several eslint plugins to enforce a standard of code quality, best practices and consistent styling throughout the project. ESlint configuration can be found in the `./.eslintrc.js` file, we also utilize [prettier](https://prettier.io/) to configure styling, that configuration can be found in the `./.prettierrc.json` file. Please keep in mind that eslint will automatically format the code based on the options configured for prettier, there's no need to run prettier on it's own. Furthermore there's a [husky](https://typicode.github.io/husky/) precommit hook that automatically runs the linter before a commit. A linter error will prevent the commit. See `./.husky/pre-commit` if you wish to modify or remove the precommit hook.

## Changelog

### [0.0.1] - 2023-08-21 
    - Initial commit
### [0.0.2] - 2023-09-25 
    - Upgraded Cypress to v13.2.0.
    - Refactored ENV param to be set via cli instead of cypress.env file. 
    - Linting configuration improvements 
### [0.0.3] - 2024-01-16
    - Upgraded Cypress to v13.6.2
    - Replaced Cypress Tags with Cypress Grep
    - Removed LambdaTest Cypress integration
    - Added parallel run plugin
    - Added multi-reporter plugin
    - Added lintstaged
### [0.0.4] - 2024-02-05
    - Upgraded Cypress to v13.6.4, other minor version upgrades to multiple packages
    - Moved reporter logic from cypress.config.ts to reporterUtils.ts
    - Added Mochawesome HTML and JSON reports capability
    - Migrated to Husky v9
### [0.0.5] - 2024-04-12
    - Upgraded Cypress to v13.7.3
    - Fixed junit reporter path for Windows OS
    - Fixed empty mochawesome html report when running a large volume of tests
### [0.0.6] - 2024-05-03
    - Upgraded Cypress to v13.8.1
    - Upgraded typescript-eslint plugin and parser to v7
    - Upgraded cypress eslint plugin to v3
    - Added WebKit(Safari) support
    - Modified linting rules to avoid errors when using chai.expect and chai.assert
### [0.0.7] - 2024-10-03
    - Upgraded Cypress to v13.15.0
    - Minor version updates for other dependencies
    - Added Cypress Debug npm script
    - Added Cypress Record npm script
    - Modified Prettier formatting rules
    - Removed Cypress Parallel npm script and plugin
    - Updated the README file to include information on the newly added scripts.
    - Updated the README file to include information on the Cypress Cloud setup process
    - Removed section of the Cypress Parallel script in the README
### [0.0.8] - 2025-03-12
    - Upgraded Cypress to v14.1.0
    - Updated most dependencies to their latest version
    - Removed airbnb-base eslint plugin
