import React, { Fragment, useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddCircle from '@material-ui/icons/AddCircle';
import makeStyles from '@material-ui/core/styles/makeStyles';

import OrdenList from '@/components/Orden/OrdenList';
import OrdenAddModal from '@/components/Orden/OrdenAddModal';

import { useAppSelector } from '@/hooks';

const useStyle = makeStyles({
  container: {
    marginTop: '8px',
  },
});

const Home: React.FC = () => {
  const classes = useStyle();
  const ordenes = useAppSelector(state => state.orden.ordenes);
  const [openModal, setOpenModal] = useState(false);


  const modalHandleClose = () => setOpenModal(false);
  const modalHandleOpen = () => setOpenModal(true);

  return (
    <Fragment>
      <Grid container spacing={2} className={classes.container}>
        <Grid item container justifyContent="flex-end">
          <Button
            onClick={modalHandleOpen}
            variant="contained"
            disableElevation
            endIcon={<AddCircle />}
          >
            Nuevo
          </Button>
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          {ordenes.length > 0 ? (
            <OrdenList ordenes={ordenes}></OrdenList>
          ) : (
            <Typography align="center">No hay órdenes encontradas</Typography>
          )}
        </Grid>
        <OrdenAddModal onClose={modalHandleClose} open={openModal} />
      </Grid>
    </Fragment>
  );
};

export default Home;
