import chai from 'chai';
import sinon from 'sinon';
import TasksService from '../../server/api/services/tasks.service';
import { findOrCreateDB, destroyDb } from '../../server/api/services/tasks.db.service';
let db 

const expect = chai.expect;

describe('Tasks Service Unit', () => {
  before(function() {
    // Create database and add a task to db
    return new Promise((resolve, reject) => {
      findOrCreateDB
      .then(idb => {
        db = idb
        resolve(db)
      })
      .catch( error => {
        reject(error)
      })
    })
  });

  after(function() {
    // Destroy test database
    return new Promise((resolve, reject) => {
      destroyDb('tasks-test')
        .then(res => {
          resolve(res)
        })
        .catch( error => {
          reject(error)
        })
    });
  });

  afterEach(() => {
    // Restore the default sandbox
    sinon.restore();
  });

  describe('TasksService all method', () => {
    it('should call view once', function() {
      let viewSpy = sinon.spy(db, "view");
      TasksService.all(db)
      sinon.assert.calledOnce(viewSpy);
    });
  });
  
  describe('TasksService byId method', () => {
    it('should call get once', function() {
      let getSpy = sinon.spy(db, "get");
      TasksService.byId(db, '123')
      sinon.assert.calledOnce(getSpy);
    });
  });

  describe('TasksService create method', () => {
    it('should call insert once with task object', function() {
      let insertSpy = sinon.spy(db, "insert")

      const task = {
        name: 'test',
        description: 'test',
        due_date: '2018-12-25',
        completed: false,
        type: 'task'
      }

      TasksService.create(db, {name: 'test', description: 'test', due_date: '2018-12-25'})

      sinon.assert.calledWith(insertSpy, task);
    });
  });

  describe('TasksService update method', () => {
    it('should call get once', function() {
      let getSpy = sinon.spy(db, "get")
      TasksService.update(db, '123', {completed: true})
      sinon.assert.calledOnce(getSpy)
    });
  });

  describe('TasksService delete method', () => {
    it('should call get once', function() {
      let getSpy = sinon.spy(db, "get")
      TasksService.delete(db, '123')
      sinon.assert.calledOnce(getSpy)
    });
  });

});
