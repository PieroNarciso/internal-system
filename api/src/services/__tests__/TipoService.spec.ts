import { getConnection } from 'typeorm';
import { dbConnection } from '../../config/db';

import { TipoNombre } from '../../types';
import TipoService from '../TipoService';
import { Tipo } from '../../models/Tipo';

export const NUMBER_TIPO_INSTANCES_INITIALIZED = 2;

export const testsTipoInstancesInitialize = async () => {
  await Tipo.create({
    nombre: TipoNombre['DESPACHO'],
  }).save();
  await Tipo.create({
    nombre: TipoNombre['PRODUCCION'],
  }).save();
};

beforeAll(async () => {
  await dbConnection();
});

afterAll(async () => {
  await getConnection().close();
});

afterEach(async () => {
  await getConnection().synchronize(true);
});

describe('Tipo Service create method', () => {
  test('if Tipo instances must be one', async () => {
    await TipoService.create({
      tipoName: TipoNombre['DESPACHO'],
    });
    const tipos = await Tipo.find();
    expect(tipos.length).toBe(1);
  });

  test('if Tipo is duplicated', async () => {
    try {
      await testsTipoInstancesInitialize();
      await Tipo.create({ nombre: TipoNombre['DESPACHO'] }).save();
    } catch (err) {
      expect(err).toBeDefined();
    } finally {
      const tipos = await TipoService.findAll();
      expect(tipos.length).toBe(NUMBER_TIPO_INSTANCES_INITIALIZED);
    }
  });
});

describe('Tipo Service findAll method', () => {
  test('if Tipo instances must be empty', async () => {
    const tipos = await TipoService.findAll();
    expect(tipos.length).toBe(0);
  });

  test('if Tipo instances must be two', async () => {
    await testsTipoInstancesInitialize();
    const tipos = await TipoService.findAll();
    expect(tipos.length).toBe(NUMBER_TIPO_INSTANCES_INITIALIZED);
  });
});
