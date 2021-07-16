import { Router } from 'express';
import {
  createHistoria,
  getHistoriaById,
  getHistoriasByItemId,
  getHistoriasByOrdenId
} from '@/controllers/HistoriaController';


const historiaRouter = Router();


historiaRouter.post('/', createHistoria);
historiaRouter.get('/:historiaId', getHistoriaById);
historiaRouter.get('/orden/:ordenId', getHistoriasByOrdenId);
historiaRouter.get('/item/:itemId', getHistoriasByItemId);


export { historiaRouter };
