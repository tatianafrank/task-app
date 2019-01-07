# Task App

Task App allows a single user to create and manage a list of tasks.
Task App contains an API, database, UI frontend, and unit/functional tests, all contained in separate docker containers, spun up with a single docker-compose command.

## Tech

Task app uses the following technologies:

* [Vue.js](https://vuejs.org/) - Reactive javascript framework
* [node.js](http://nodejs.org) - Evented I/O for the backend
* [Express](http://expressjs.com) - Fast node.js network app framework 
* [NPM](https://www.npmjs.com/) - Javascript package manger
* [CouchDB](http://couchdb.apache.org/) - Javascript package manger
* [Docker](https://www.docker.com/) - Container platform
* [Mocha JS](https://mochajs.org) - Testing framework

## Requirements

-   Docker 
-   Docker Compose
-   Node
-   NPM

## Setup

Build the development environment from the root directory:

```bash
$ cd task-app/
$ docker-compose build
```
## Running the environment

Start the whole environment (CouchDB + API + UI):

```bash
docker-compose up couchdb api frontend
```

Run tests

This container will exit on its own after tests finish running

```bash
docker-compose up test
```

Frontend UI is at http://localhost:8080

API is at  http://localhost:3000

Database is at http://localhost:5984


## UI Navigation

Visit UI at http://localhost:8080

* Create tasks using the 'Add Task' form
* Mark tasks complete/incomplete using the 'Completed' checkbox
* Delete tasks using the 'Delete' checkbox
* Filter tasks using the dropdown menu above table (use 'all' filter to show all tasks without filters)
* Tasks that are overdue will say 'overdue' next to the due date
* Tasks that are due today or tomorrow will say 'due soon' next to the due date

## API Reference

You can visit http://localhost:3000/api/v1/spec for API docs. The endpoints are listed below as well:

* GET /tasks - Returns all tasks in the tasks database
* POST /tasks - Create a new task
* GET /tasks/{id} - Retrieve a specific task
* PUT /tasks/{id}/update - Edit the attributes of a specific task
* DELETE /tasks/{id}/delete - Delete a specific task

For API documentation, check README in /task-api

## Database

A database called 'tasks' is created when the API server is started. Tasks are stored as docs with the following schema:

* name: string
* description: string
* due_date: string
* completed: boolean (defaults to faslse)
* type: string (defaults to 'task')
