import TasksService from '../../services/tasks.service';
import { findOrCreateDB } from '../../services/tasks.db.service';
const { validationResult } = require('express-validator/check');
let db 
(async () => {
  db = await findOrCreateDB;
})();

export class Controller {
  // Fetch all tasks
  all(req, res) {
    TasksService.all(db).then(r => {
      res.json(r);
    })
    .catch((error) => {
      res.statusCode = 500
      res.end(error.message)
    });
  }
  // Fetch task by ID
  byId(req, res) {
    TasksService.byId(db, req.params.id).then(r => {
      res.json(r);
    })
    .catch((error) => {
      res.statusCode = 500
      res.end(error.message)
    });
  }
  // Create new task
  create(req, res) {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).send(errors.array());
    } else {
      TasksService.create(db, req.body).then(r => {
        res.json(r);
      })
      .catch((error) => {
        res.statusCode = 500
        res.end(error.message)
      });
    }
  }
  // Update existing task 
  update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).send(errors.array());
    } else {
      TasksService.update(db, req.params.id, req.body).then(r => {
        res.json(r);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
    }
  }
  // Delete existing task
  delete(req, res) {
    TasksService.delete(db, req.params.id).then(r => {
        res.json(r);
      })
      .catch((error) => {
        res.statusCode = 500
        res.end(error.message)
      });
  }
}
export default new Controller();
