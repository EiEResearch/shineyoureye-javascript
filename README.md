[![Build Status](https://travis-ci.org/EiEResearch/shineyoureye-javascript.svg?branch=master)](https://travis-ci.org/EiEResearch/shineyoureye-javascript)
[![Coverage Status](https://coveralls.io/repos/github/EiEResearch/shineyoureye-javascript/badge.svg)](https://coveralls.io/github/EiEResearch/shineyoureye-javascript)

# Shine Your Eye (JavaScript)

This project is a lightweight parliamentary monitoring site for Nigeria. It
uses EveryPolitician data, user-editable data (through
[prose.io](http://prose.io/)), and JSON data. It doesn't use a database.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Running the app

### Initialise the project

```
npm install
```

### Prepare data for the app

```
node bin/prepare-data
```

This will copy the user-editable contents of the site (the blog posts
and static pages generated using [prose.io](http://prose.io/)) into a
`prose` directory.

### Run the app

```
npm run serve
```

And go to <http://localhost:8080/>

