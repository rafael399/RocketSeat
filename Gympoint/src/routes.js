import { Router } from 'express';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import AdmHelpOrderController from './app/controllers/AdmHelpOrderController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';
import StudentLoginController from './app/controllers/StudentLoginController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/students/:student_id/checkins', CheckinController.index);
routes.post('/students/:student_id/checkins', CheckinController.store);
routes.post(
  '/students/:student_id/help-orders',
  StudentHelpOrderController.store
);
routes.get(
  '/students/:student_id/help-orders',
  StudentHelpOrderController.index
);
routes.get('/students/:student_id', StudentLoginController.index);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:student_id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plan', PlanController.index);
routes.post('/plan', PlanController.store);
routes.put('/plan/:id', PlanController.update);
routes.delete('/plan/:id', PlanController.delete);

routes.get('/registration', RegistrationController.index);
routes.post('/registration', RegistrationController.store);
routes.put('/registration/:id', RegistrationController.update);
routes.delete('/registration/:id', RegistrationController.delete);

routes.get('/help-orders', AdmHelpOrderController.index);
routes.post('/help-orders/:id/answer', AdmHelpOrderController.store);

export default routes;
