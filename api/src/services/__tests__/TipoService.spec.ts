import { getConnection } from 'typeorm';
import { dbConnection } from '../../config/db';

import { TipoNombre } from '../../types';
import TipoService from '../TipoService';

describe('Tipo Service unit tests', () => {

  beforeAll(async () => {
    await dbConnection();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  afterEach(async () => {
    await getConnection().synchronize(true);
  });

  test('if Tipo instances must be empty', async () => {
    const tipos = await TipoService.findAll();
    expect(tipos.length).toBe(0);
  });

  test('if Tipo instances must be one', async () => {
    await TipoService.create({
      tipoName: TipoNombre['DESPACHO'],
    });
    const tipos = await TipoService.findAll();
    expect(tipos.length).toBe(1);
  });

  test('if Tipo instances must be two', async () => {
    await TipoService.create({ tipoName: TipoNombre['DESPACHO'] });
    await TipoService.create({ tipoName: TipoNombre['PRODUCCION'] });
    const tipos = await TipoService.findAll();
    expect(tipos.length).toBe(2);
  });

  test('if Tipo is duplicated', async () => {
    try {
      await TipoService.create({ tipoName: TipoNombre['DESPACHO'] });
      await TipoService.create({ tipoName: TipoNombre['DESPACHO'] });
    } catch (err) {
      expect(err).toBeDefined();
    } finally {
      const tipos = await TipoService.findAll();  
      expect(tipos.length).toBe(1);
    }
  });
});
