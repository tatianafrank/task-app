# task-api

Task list app

## Get Started

Get started developing...

# install deps
```shell
npm install
```

# Connect to couchdb locally
docker run -it -p 5984:5984 --name local-couchdb apache/couchdb:latest

# run in development mode
npm run dev

# run tests
# (Make sure database is up before running tests by running `docker-compose up couchdb`)
npm run test

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Try It
* Open you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/tasks` endpoint 
  ```shell
  curl http://localhost:3000/api/v1/tasks
  ```

Example GET request using curl:

`curl -H 'Content-Type: application/json' http://localhost:3000/api/v1/tasks`

Example POST request:

`curl -H "Content-Type: application/json" -d '{"name":"groceries", "description": "buy milk and eggs", "due_date": "2018-12-25"}' -X POST http://localhost:3000/api/v1/tasks`

Example PUT request:

`curl -H "Content-Type: application/json" -d '{"completed":true}' -X PUT http://localhost:3000/api/v1/tasks/<id>/update`

Example DELETE request:

`curl -X DELETE http://localhost:3000/api/v1/tasks/<id>/delete`

