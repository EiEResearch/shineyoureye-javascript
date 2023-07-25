[![Build Status](https://travis-ci.org/EiEResearch/shineyoureye-javascript.svg?branch=master)](https://travis-ci.org/EiEResearch/shineyoureye-javascript)
[![Coverage Status](https://coveralls.io/repos/github/EiEResearch/shineyoureye-javascript/badge.svg)](https://coveralls.io/github/EiEResearch/shineyoureye-javascript)

# Shine Your Eye (JavaScript)

This project is a lightweight parliamentary monitoring site for Nigeria. It
uses GoogleSheets data, user-editable data (through [prose.io](http://prose.io/)), and static images hosted on `gh-pages`. It doesn't use a database.

## Approach
The approach to this project is similar to [`shineyoureye-sinatra`](https://github.com/theyworkforyou/shineyoureye-sinatra):

* This is a Node.js application that uses content produced by [prose.io](http://prose.io/) that is saved in
[`shineyoureye-prose`](https://github.com/theyworkforyou/shineyoureye-prose).
* The `npm run prose` script pulls this content into a local prose folder.
* The `cd api && npm run start` script starts the backend api engine, this engine consolidates different data sources into a REST JSON Api to be consumed by authorized hosts.
* the `npm run serve` script starts the frontend website which was designed in Vue.js, producing an updated version of the site

Non-technical users can use [prose.io](http://prose.io/) to add content to the prose repo.

## Data sources
This project uses data from several different sources:

* The basic details of current Senators and members of the House
  of Representatives was generated from a GoogleSheets document. This
  GoogleSheets data is accessed using the GoogleSheets API.
* Boundaries and geographical area information are from a MapIt instance:
  http://nigeria.mapit.mysociety.org/
* The images of politicians referenced by the site are served
  from GitHub pages:
     * https://github.com/theyworkforyou/shineyoureye-images

## Development

If you want to contribute to this project, please read our [contributing guidelines](https://github.com/EiEResearch/shineyoureye-javascript/blob/master/.github/CONTRIBUTING.md).

## How to use this project

This is a Node.js, Express and Vue.Js project.
The Express framework handles the web services that exposes Politicians data, places and boundaries data
 and Admin editable contents.

## Running the project

### Setting up Express.js 
1. Open a new terminal, go to project location and change directory to the folder `api`, you would type:
```cd api```

2. Then install the necessary dependencies, you would type:
```npm install```

3. You can proceed to start the express project:
```npm run start```

### Setting up Vue.js
1. Open another terminal, go to project location and proceed to install the necessary dependencies, you would type:
```npm install```

2. Configure the proper properties in the .env.development file.

3. If installation is successful, you would pull in the prose content:
```npm run prose```

4. If installation is successful, you would start the Vue.js project:
```npm run serve```

and go to <http://localhost:8080/>

## Tests and Coverage
For the tests, some of the user-editable contents of the site are used as fixtures. So we have to use this data in a particular point of its history. We can do that by positioning the repo at a particular commit, using the same script we used before. For example, to use the contents as they looked like at commit `ffc1fe0`:

```
node bin/prepare-data ffc1fe0
```

After doing this, we can run the tests.

### Running just the tests
```npm run test```

### Running both the tests and getting a coverage report
```npm run test:coverage```

### Running tests in realtime
```npm run test:unit```

## Lint

### Running just the lint
```npm run lint```

### Running the lint to fix errors 
```npm run lint -- --fix```
