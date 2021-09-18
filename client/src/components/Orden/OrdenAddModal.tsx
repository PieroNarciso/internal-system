import React, { useState } from 'react';

import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
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

import AddCircle from '@material-ui/icons/AddCircle';

import makeStyle from '@material-ui/core/styles/makeStyles';

import { ItemCreate } from '@/interfaces/item.interface';

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
    overflow: 'auto',
  }
});

const OrdenAddModal: React.FC<OrdenAddProps> = ({ onClose, open }) => {
  const classes = useStyle();
  const [empresaId, setEmpresaId] = useState<number>(0);
  const [numOrden, setNumOrden] = useState('');
  const [itemstoCreate, setItemsToCreate] = useState<ItemCreate[]>([]);

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
      return [...prevState, {
        name: '',
        totalDespachar: 0,
      }]
    });
  };

  return (
    <Modal onClose={onClose} open={open}>
      <Box className={classes.modal}>
        <Card className={classes.card}>
          <CardContent>
            <Select
              value={empresaId}
              label="Empresa"
              onChange={handleChangeEmpresaId}
              variant="outlined"
              required
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>Tsonkiri</MenuItem>
            </Select>
            <TextField
              value={numOrden}
              onChange={handleNumOrden}
              label="Número de Orden"
              placeholder="Número de Orden"
              variant="outlined"
              required
            />
            <Button
              variant="contained"
              disableElevation
              endIcon={<AddCircle />}
              onClick={addNewItemField}
            >
              Agregar Item
            </Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Item
                  </TableCell>
                  <TableCell>
                    Peso (KG)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemstoCreate.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField type="text" value={item.name} size="small"></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField type="number" size="small"></TextField>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button>Guardar</Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export default OrdenAddModal;
