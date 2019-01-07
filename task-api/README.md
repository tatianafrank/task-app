# task-api

Node/Express API handles CRUD requests for couchdb tasks database

# Requirements

Node version >=8

# Install

```shell
npm install
```

# Connect to couchdb locally (in a separate console window)

```shell
docker run -it -p 5984:5984 --name local-couchdb apache/couchdb:latest
```

# Run API in development mode

```shell
npm run dev
```

# Run in production mode:

```shell
npm run compile
npm start
```

# Run tests

(Make sure database is running and exit dev or production instance)

```shell
npm run test
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

