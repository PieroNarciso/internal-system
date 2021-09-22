import { getConnection } from 'typeorm';
import { dbConnection } from '../../config/db';

import { Empresa } from '../../models/Empresa';
import EmpresaService from '../EmpresaService';


const NUMBER_OF_EMPRESA_INSTANCES_INITIALIZED = 1;

const testsEmpresaInstancesInitialize = async (): Promise<void> => {
  await Empresa.create({
    razonSocial: 'test',
    ruc: '123456789',
  }).save();
};

beforeAll(async () => {
  await dbConnection();
});

afterEach(async () => {
  await getConnection().synchronize(true);
});

afterAll(async () => {
  await getConnection().close();
});

describe('EmpresaService fetchAll method', () => {

  it('should return an empty array of intances', async () => {
    const empresas = await EmpresaService.fetchAll();
    expect(empresas).toHaveLength(0);
  });

  it('should return an array of intances that were initialized', async () => {
    await testsEmpresaInstancesInitialize();
    const empresas = await EmpresaService.fetchAll();
    expect(empresas).toHaveLength(NUMBER_OF_EMPRESA_INSTANCES_INITIALIZED);
  });
});
