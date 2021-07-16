import { Router } from 'express';
import {
  createHistoria,
  getHistoriasByItemId,
  getHistoriasByOrdenId
} from '@/controllers/HistoriaController';


const historiaRouter = Router();


historiaRouter.post('/', createHistoria);
historiaRouter.get('/:historiaId');
historiaRouter.get('/orden/:ordenId', getHistoriasByOrdenId);
historiaRouter.get('/item/:itemId', getHistoriasByItemId);


export { historiaRouter };
