import React, { Fragment, useState, useEffect } from 'react';

import OrdenList from '@/components/Orden/OrdenList';
import OrdenAddModal from '@/components/Orden/OrdenAddModal';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchOrdenes } from '@/store/orden/orden.thunks';
import { Button, Flex, Spacer, useDisclosure } from '@chakra-ui/react';
import { MdAddCircle } from 'react-icons/md';


const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const ordenes = useAppSelector(state => state.orden.ordenes);
  const { isOpen, onClose, onToggle } = useDisclosure();

  useEffect(() => {
    dispatch(fetchOrdenes());
  }, []);

  const modalHandleClose = () => setOpenModal(false);
  const modalHandleOpen = () => setOpenModal(true);

  return (
    <Fragment>
      <Flex direction="column">
        <Flex>
          <Spacer />
          <Button rightIcon={<MdAddCircle />} onClick={onToggle}>Agregar Orden</Button>
          <OrdenAddModal isOpen={isOpen} onClose={onClose} />
        </Flex>
        <OrdenList ordenes={ordenes} />
      </Flex>
    </Fragment>
  );
};

export default Home;
