import tasksRouter from './api/controllers/tasks/router';

export default function routes(app) {
  app.use('/api/v1/tasks', tasksRouter);
}
