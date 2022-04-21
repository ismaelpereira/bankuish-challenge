# Bankuish Challenge

## Running with docker

This is my resolution for bankuish challenge, to run you need to run `

`docker-compose up`

But before, you need to create a Database and check the config on `./db/config.ts` in Docker if not created

## Running locally

You need to run

`npm install`

Then, you need tocreate a SQL Database and check the config on `./db/config.ts`

For create a user you need to post on route `/register` and authenticate by `/auth/:id`

The outher routes are commented what you have to do.
