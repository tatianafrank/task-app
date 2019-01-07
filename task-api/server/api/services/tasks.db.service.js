import l from '../../common/logger';
const HOST = process.env.DB_HOST || 'localhost';
const nano = require('nano')(`http://${HOST}:5984`);
let tasksDb = 'tasks'

module.exports.findOrCreateDB = new Promise((resolve, reject) => {
  if(HOST == 'localhost' || process.env.NODE_ENV == 'dev') {
    // Use test db locally
    tasksDb = 'tasks-test'
  }
  // Create users DB (needed for couchdb image)
  nano.db.create('_users')
    .then( res => {
      l.info('_users database created!')
    })
    .catch( error => {
      l.info('_users database exists')
    })
  // Create tasks DB
  nano.db.create(tasksDb)
    .then( res => {
      l.info(tasksDb, ' database created!')
      // Create couchdb view for retrieving all docs with type 'task'
      return nano.db.use(tasksDb).insert(
      { 
        "_id" : "_design/tasks",
        "views": 
        { 
          "all": { 
            "map": function(doc) { 
              if (doc.type && doc.type == 'task') {
                emit(doc.due_date, doc)
              } 
            } 
          }
        }
      })
    })
    .then(res => {
      // Return tasks db object
      l.info('Design inserted')
      if(nano.db.use(tasksDb)){
        resolve(nano.db.use(tasksDb))
      } else {
        reject(error)
      }
    })
    .catch( error => {
      l.info(error.error)
      if(nano.db.use(tasksDb)){
        resolve(nano.db.use(tasksDb))
      } else {
        reject(error)
      }
    })
    
})

module.exports.destroyDb = function (dbName) {
  // Destroy db 
  return new Promise(function(resolve, reject) {
    nano.db.destroy(dbName)
    .then(res => {
      l.info(res)
      resolve(res)
    })
    .catch(error => {
      l.info(error)
      reject(error)
    })
  })
}

