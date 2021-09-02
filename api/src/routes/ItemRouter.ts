import { Router } from 'express';

import { createItem, getItemById, getItemsByOrdenId } from '@/controllers/ItemController';

const itemRouter = Router();

itemRouter.post('/', createItem);
itemRouter.get('/:itemId', getItemById);

itemRouter.get('/orden/:ordenId', getItemsByOrdenId);

export { itemRouter };
