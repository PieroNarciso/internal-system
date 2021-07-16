import { Router } from 'express';

import { createItem, getItemById, getItemsByOrdenId } from '@/controllers/ItemControllers';


const itemRouter = Router();


itemRouter.post('/', createItem);
itemRouter.get('/:itemId', getItemById);
itemRouter.post('/orden/:ordenId', getItemsByOrdenId);

export { itemRouter };
