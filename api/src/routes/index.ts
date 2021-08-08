/**
 * Global Import from Routes
 */
import { Router, Express } from 'express';

import { userRouter } from './UserRouter';
import { empresaRouter } from './EmpresaRouter';
import { ordenServicioRouter } from './OrdenServicioRouter';
import { tipoRouter } from './TipoRouter';
<<<<<<< HEAD
=======
import { historiaRouter } from './HistoriaRouter';
>>>>>>> 70102a702073c944a65c48344517a7d15eb7e2c7
import { itemRouter } from './ItemRouter';

const router = Router();

/**
 * Sample Route
 */
router.get('/', (_req, res) => {
  return res.send('Hello World!');
});


export const globalRouter = (app: Express): void => {

  app.use('/', router);

  /**
   * Import Other Routes
   */
  app.use('/users', userRouter);
  app.use('/empresas', empresaRouter);
  app.use('/ordenes', ordenServicioRouter);
  app.use('/tipos', tipoRouter);
<<<<<<< HEAD
=======
  app.use('/historias', historiaRouter);
>>>>>>> 70102a702073c944a65c48344517a7d15eb7e2c7
  app.use('/items', itemRouter);
};
