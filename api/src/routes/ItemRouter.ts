import { Router } from 'express';


import { createItem, getItemById } from '@/controllers/ItemController';

const itemRouter = Router();


itemRouter.post('/', createItem);
itemRouter.get('/:itemId', getItemById);


export { itemRouter };
