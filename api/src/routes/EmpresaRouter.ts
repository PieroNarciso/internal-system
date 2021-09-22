import { Router } from 'express';
import { createEmpresa, fetchAllEmpresas, getEmpresaById } from '../controllers';


const empresaRouter = Router();


empresaRouter.get('/', fetchAllEmpresas);
empresaRouter.post('/', createEmpresa);
empresaRouter.get('/:empresaId', getEmpresaById);


export { empresaRouter };
