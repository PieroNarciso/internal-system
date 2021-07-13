import { Router } from 'express';

import { createTipo, getTipos, getTipoById } from '@/controllers/TipoController';

const tipoRouter = Router();


tipoRouter.post('/', createTipo);
tipoRouter.get('/', getTipos);
tipoRouter.get('/:tipoId', getTipoById);


export { tipoRouter };
