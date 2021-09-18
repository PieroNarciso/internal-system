import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle'
import Grid from '@material-ui/core/Grid';

import OrdenList from '@/components/Orden/OrdenList';
import OrdenAddModal from '@/components/Orden/OrdenAddModal';
import { Orden } from '@/interfaces/orden.interface';

const Home: React.FC = () => {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const modalHandleClose = () => setOpenModal(false);
  const modalHandleOpen = () => setOpenModal(true);

  return (
  <Fragment>
    <Grid container justifyContent="flex-end">
      <Button onClick={modalHandleOpen} variant="contained" disableElevation endIcon={<AddCircle />}>Nuevo</Button>
    </Grid>
    <OrdenList ordenes={ordenes}></OrdenList>
    <OrdenAddModal onClose={modalHandleClose} open={openModal} />
  </Fragment>
  )
};

export default Home;
