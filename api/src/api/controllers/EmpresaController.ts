import { Request, Response } from 'express';

import { Empresa } from '@/api/models/Empresa';
import { FindOneOptions, getRepository } from 'typeorm';

export const createEmpresa = async (req: Request, res: Response) => {
  try {
    const [empresa] = getRepository(Empresa).create([{ ...req.body }]);
    await empresa.save();
    return res.status(201).send(empresa);
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * Recibe como parametro `empresaId` que es la Pk de la instancia a buscar
 * Querys:
 *   -- ordenes: boolean Agregar las ordenes de la empresa o no
 */
export const getEmpresaById = async (req: Request, res: Response) => {
  const options: FindOneOptions<Empresa> = req.query.ordenes === 'true'
    ? { relations: ['ordenes'] }
    : {};
  try {
    const empresa = await getRepository(Empresa).findOne(
      req.params.empresaId,
      options
    );

    if (empresa) {
      return res.status(200).send(empresa);
    }
    return res.status(404).send({ msg: 'No encontrado' });
  } catch (err) {
    return res.status(500).send(err);
  }
};
