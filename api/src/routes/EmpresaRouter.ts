import { Router } from 'express';
import { createEmpresa, getEmpresaById } from '../controllers';


const empresaRouter = Router();


empresaRouter.post('/', createEmpresa);
empresaRouter.get('/:empresaId', getEmpresaById);


export { empresaRouter };
