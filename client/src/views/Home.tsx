import React, { Fragment, useEffect } from 'react';

import OrdenList from '@/components/Orden/OrdenList';
import OrdenAddModal from '@/components/Orden/OrdenAddModal';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchOrdenes } from '@/store/orden/orden.thunks';
import {
  Button,
  Flex,
  Spacer,
  useDisclosure,
  Box,
  VStack,
} from '@chakra-ui/react';
import { MdAddCircle } from 'react-icons/md';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const ordenes = useAppSelector((state) => state.orden.ordenes);
  const {
    isOpen: modalIsOpen,
    onClose: modalOnClose,
    onToggle: modalOnToggle,
  } = useDisclosure();

  useEffect(() => {
    dispatch(fetchOrdenes());
  }, []);

  return (
    <Fragment>
      <VStack spacing="5" alignItems="normal">
        <Flex>
          <Spacer />
          <Button rightIcon={<MdAddCircle />} onClick={modalOnToggle}>
            Agregar Orden
          </Button>
          <OrdenAddModal isOpen={modalIsOpen} onClose={modalOnClose} />
        </Flex>
        {ordenes.length > 0 ? (
          <OrdenList ordenes={ordenes} />
        ) : (
          <Box textAlign="center">No hay ordenes disponibles</Box>
        )}
      </VStack>
    </Fragment>
  );
};

export default Home;
