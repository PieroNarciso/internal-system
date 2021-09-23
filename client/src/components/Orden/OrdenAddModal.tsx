import React, { useEffect, useState } from 'react';

import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';

import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

import makeStyle from '@material-ui/core/styles/makeStyles';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { ItemCreate } from '@/interfaces/item.interface';
import { createOrden } from '@/store/orden/orden.thunks';
import { fetchBusinessEntries } from '@/store/business/business.thunks';

interface OrdenAddProps {
  onClose: () => void;
  open: boolean;
}

const useStyle = makeStyle({
  modal: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    maxHeight: '500px',
    maxWidth: '600px',
    overflow: 'auto',
  },
});

const OrdenAddModal: React.FC<OrdenAddProps> = ({ onClose, open }) => {
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const empresas = useAppSelector(state => state.business.businesses);
  const [empresaId, setEmpresaId] = useState<number>(0);
  const [numOrden, setNumOrden] = useState('');
  const [itemstoCreate, setItemsToCreate] = useState<ItemCreate[]>([]);

  useEffect(() => {
    dispatch(fetchBusinessEntries());
  }, []);

  const handleChangeEmpresaId = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setEmpresaId(parseInt(event.target.value as string));
  };
  const handleNumOrden = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumOrden(event.target.value);
  };

  const addNewItemField = () => {
    setItemsToCreate((prevState) => {
      return [
        ...prevState,
        {
          name: '',
          totalDespachar: 0,
        },
      ];
    });
  };

  const removeItemField = (index: number) => {
    setItemsToCreate((prevState) => {
      const newItems = [...prevState];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  const changeInputItemName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    setItemsToCreate((prevState) => {
      const currElements = [...prevState];
      currElements[index].name = event.target.value;
      return currElements;
    });
  };
  const changeInputItemPeso = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    setItemsToCreate((prevState) => {
      const currElements = [...prevState];
      currElements[index].totalDespachar = parseFloat(event.target.value);
      return currElements;
    });
  };

  const addNewOrden = async () => {
    await dispatch(createOrden({
      empresaId,
      numOrden,
      items: itemstoCreate,
    })).unwrap();
    onClose();
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Box className={classes.modal}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Select
                  value={empresaId}
                  label="Empresa"
                  onChange={handleChangeEmpresaId}
                  variant="outlined"
                  required
                  placeholder="Empresa"
                  fullWidth
                >
                  <MenuItem value={0} disabled selected>
                    Empresa
                  </MenuItem>
                  {empresas.map(empresa => (
                    <MenuItem value={empresa.id}>{empresa.razonSocial}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={numOrden}
                  onChange={handleNumOrden}
                  label="Número de Orden"
                  fullWidth
                  placeholder="Número de Orden"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item container justifyContent="flex-end">
                <Button
                  variant="contained"
                  disableElevation
                  endIcon={<AddCircle />}
                  onClick={addNewItemField}
                >
                  Agregar Item
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell size="small">Peso</TableCell>
                      <TableCell size="small"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {itemstoCreate.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            type="text"
                            fullWidth
                            value={item.name}
                            onChange={(event) =>
                              changeInputItemName(event, index)
                            }
                            size="small"
                          ></TextField>
                        </TableCell>
                        <TableCell size="small">
                          <TextField
                            type="number"
                            fullWidth
                            value={item.totalDespachar}
                            onChange={(event) =>
                              changeInputItemPeso(event, index)
                            }
                            size="small"
                          ></TextField>
                        </TableCell>
                        <TableCell size="small">
                          <IconButton
                            size="small"
                            onClick={() => removeItemField(index)}
                          >
                            <RemoveCircle />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={addNewOrden}>Guardar</Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export default OrdenAddModal;
