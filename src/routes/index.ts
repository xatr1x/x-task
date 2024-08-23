import { Router } from 'express';
import typeRoutes from './type';
import brandRoutes from './brand';
import modelRoutes from './model';
import requestRoutes from './request';
import detailsRoutes from './details';
import solutionRoutes from './solution'
import problemRoute from './problem';

const routes = Router();

routes.use('/types', typeRoutes);
routes.use('/brands', brandRoutes);
routes.use('/models', modelRoutes);
routes.use('/requests', requestRoutes);
routes.use('/details', detailsRoutes);
routes.use('/solutions', solutionRoutes);
routes.use('/problems', problemRoute);

export default routes;
