import chai from 'chai';
import request from 'supertest';
import Server from '../../server';
import l from '../../server/common/logger';
import { findOrCreateDB, destroyDb } from '../../server/api/services/tasks.db.service';

const expect = chai.expect;
let theId = Math.random().toString(36).substring(5);

describe('Tasks Integration', () => {

  before(function() {
    // Create database and add a task to db
    return new Promise((resolve, reject) => {
      findOrCreateDB
      .then(db => {
        const task = {
          name: 'test',
          description: 'testing',
          due_date: '2018-12-25',
          completed: false,
          type: 'task'
        }
        return db.insert(task, theId)
      })
      .then(res => {
        resolve(res)
      })
      .catch( error => {
        reject(error)
      })
    })
  });

  it('should get all tasks', () =>
    request(Server)
      .get('/api/v1/tasks')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
      }));

  it('should get a task by ID', () =>
    request(Server)
      .get(`/api/v1/tasks/${theId}`)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
      }));

  it('should add a new task', () =>
    request(Server)
      .post('/api/v1/tasks')
      .send({ 
        name: 'test', 
        description: 'test',
        due_date: '2018-12-25' 
      })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('ok')
          .equal(true);
      }));

  it('should update an existing task', () =>
    request(Server)
      .put(`/api/v1/tasks/${theId}/update`)
      .send({ 
        completed: true, 
      })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('ok')
          .equal(true);
      }));

  it('should delete an existing task', () =>
    request(Server)
      .delete(`/api/v1/tasks/${theId}/delete`)
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('ok')
          .equal(true);
      }));
});
