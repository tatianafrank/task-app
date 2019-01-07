import * as express from 'express';
import controller from './controller';
import validations from './validations';

// Match API routes to controller methods and validation methods
export default express
  .Router()
  .get('/', controller.all)
  .post('/', validations.create, controller.create)
  .get('/:id', controller.byId)
  .put('/:id/update', validations.update, controller.update)
  .delete('/:id/delete', controller.delete);
