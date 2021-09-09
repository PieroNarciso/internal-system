import { Router } from 'express';

import { createTipo, getTipos } from '@/controllers/TipoController';

const tipoRouter = Router();


tipoRouter.post('/', createTipo);
tipoRouter.get('/', getTipos);


export { tipoRouter };
