import l from '../../common/logger';

// Database methods
class TasksService {
  all(db) {
    //  Return all tasks in the DB
    l.info(`${this.constructor.name}.all()`);
    return new Promise(function(resolve, reject) {
      db.view('tasks', 'all', function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  }

  byId(db, id) {
    // Retrieve task by ID 
    l.info(`${this.constructor.name}.byId(${id})`);
    return new Promise(function(resolve, reject) {
      db.get(id).then((body) => {
        resolve(body);
      })
      .catch( error => {
        reject(error)
      })
    });
  }

  create(db, params) {
    //  create a new task in the db using request params
    l.info(`${this.constructor.name}.create(${params})`);
    return new Promise(function(resolve, reject) {
      const task = {
        name: params.name,
        description: params.description,
        due_date: params.due_date,
        completed: false,
        type: 'task'
      }
      db.insert(task)
      .then((body) => {
        resolve(body)
      })
      .catch( error => {
        reject(error)
      })
    });
  }

  update(db, id, params) {
    // Not all params are required to update so params object is created dynamically
    l.info(`${this.constructor.name}.update(${id},${params})`);
    return new Promise(function(resolve, reject) {
      var parsed = {};
      return db.get(id).then((body) => {
        parsed._id = id
        parsed._rev = body._rev
        parsed.type = "task"
        parsed.name = params.name || body.name
        parsed.description = params.descriptio || body.description
        parsed.due_date = params.due_date || body.due_date
        parsed.completed = params.completed || body.completed
        return db.insert(parsed)
      })
      .then((res) => {
        resolve(res)
      })
      .catch( error => {
        reject(error)
      })
    })
  }

  delete(db, id) {
    //  Delete a task in the DB
    l.info(`${this.constructor.name}.delete(${id})`);
    return new Promise(function(resolve, reject) {
      db.get(id).then((res) => {
        db.destroy(id, res._rev, function(err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    });
  }
}

export default new TasksService();
