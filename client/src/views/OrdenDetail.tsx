import OrdenUpdateModal from '@/components/Orden/OrdenUpdateModal';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Item } from '@/interfaces/item.interface';
import { fetchOrdenById } from '@/store/orden/orden.thunks';
import { TipoName } from '@/types';
import {
  Badge,
  Box,
  Button,
  Flex,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { Fragment, useEffect } from 'react';
import { MdAddCircle, MdEdit } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const OrdenDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    isOpen: modalIsOpen,
    onClose: modalOnClose,
    onOpen: modalOnOpen,
  } = useDisclosure();
  const currentOrden = useAppSelector((state) => state.orden.currentOrden);
  const { ordenId } = useParams<{ ordenId: string }>();
  useEffect(() => {
    if (!currentOrden || currentOrden.id !== parseInt(ordenId)) {
      dispatch(fetchOrdenById(parseInt(ordenId)));
    }
  }, []);

  if (!currentOrden) {
    return <div>Not Found</div>;
  }

  const itemById = currentOrden.items.reduce<Record<number, Item>>(
    (byId, item) => {
      byId[item.id] = item;
      return byId;
    },
    {}
  );

  let totalDespachar = 0;
  let totalTejido = 0;
  let totalDespachado = 0;
  currentOrden.items.forEach((item) => {
    totalDespachar += item.totalDespachar;
    totalDespachado += item.totalDespachado;
  });
  currentOrden.historias.forEach((history) => {
    if (history.tipo === TipoName.PRODUCCION) {
      totalTejido += history.peso;
    }
  });

  return (
    <Fragment>
      {modalIsOpen && (
        <OrdenUpdateModal
          isOpen={modalIsOpen}
          onClose={modalOnClose}
          orden={JSON.parse(JSON.stringify(currentOrden))}
        />
      )}
      <Stack spacing="4">
        <Flex justifyContent="end" alignItems="center">
          <Button
            colorScheme="gray"
            rightIcon={<MdEdit />}
            onClick={modalOnOpen}
          >
            Editar
          </Button>
          <Button colorScheme="blue" marginLeft={3} rightIcon={<MdAddCircle />}>
            Nuevo
          </Button>
        </Flex>
        <Box
          borderWidth="1px"
          p="3"
          borderRadius="lg"
          display="flex"
          flexDirection="column"
          gridGap="2"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Box>{currentOrden.empresa.razonSocial}</Box>
            <Badge variant="solid" colorScheme="green" py="1">
              {currentOrden.estado}
            </Badge>
          </Flex>
          <Flex>
            <Box>OS {currentOrden.numOrden}</Box>
          </Flex>
          <Flex direction="column" alignSelf="end">
            <Box>
              Despacho: {totalDespachado.toFixed(2)} /{' '}
              {totalDespachar.toFixed(2)} KG
            </Box>
            <Box>
              Tejido: {totalTejido.toFixed(2)} / {totalDespachar.toFixed(2)} KG
            </Box>
          </Flex>
        </Box>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>Item</Th>
              <Th isNumeric>Total</Th>
              <Th isNumeric>Despachado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentOrden.items.map((item) => (
              <Tr key={item.id}>
                <Td>{item.nombre}</Td>
                <Td isNumeric>{item.totalDespachar.toFixed(2)}</Td>
                <Td isNumeric>{item.totalDespachado.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Stack>
          {currentOrden.historias.length > 0 ? (
            currentOrden.historias.map((history) => (
              <Stack p="2">
                <Flex justifyContent="space-between">
                  <Box>{itemById[history.itemId].nombre}</Box>
                  <Badge>{history.tipo}</Badge>
                </Flex>
                <Flex justifyContent="space-between">
                  <Box>Fecha: {history.createdAt}</Box>
                  <Box>Peso: {history.peso.toFixed(2)}</Box>
                </Flex>
              </Stack>
            ))
          ) : (
            <Box textAlign="center">No hay historias</Box>
          )}
        </Stack>
      </Stack>
    </Fragment>
  );
};

export default OrdenDetail;
