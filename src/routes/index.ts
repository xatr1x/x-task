import { Router } from 'express';
import typeRoutes from './type';
import brandRoutes from './brand';
import modelRoutes from './model';

const routes = Router();

routes.use('/types', typeRoutes);
routes.use('/brands', brandRoutes);
routes.use('/models', modelRoutes);

export default routes;
