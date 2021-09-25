import { Orden } from '@/interfaces/orden.interface';
import { Estado } from '@/types';
import {
  Badge,
  Box,
  Link,
  Flex,
  Spacer,
  ColorProps,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface OrdenItemProps extends Orden {}

const OrdenItem: React.FC<OrdenItemProps> = (props) => {
  let totalDespachado: number = 0;
  let totalDespachar: number = 0;

  for (const item of props.items) {
    totalDespachado += item.totalDespachado;
    totalDespachar += item.totalDespachar;
  }
  let badgeColor = 'green';
  if (props.estado === Estado.COMPLETADO) badgeColor = 'red';
  if (props.estado === Estado.INACTIVO) badgeColor = 'yellow';

  return (
    <Box borderRadius="lg" borderWidth="1px" width="full" p="3">
      <Flex direction="column">
        <Flex alignItems="center" justifyContent="center">
          <Box as="h4" isTruncated fontWeight="semibold">
            {props.empresa.razonSocial}
          </Box>
          <Spacer />
          <Box>OS {props.numOrden}</Box>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" marginTop="2">
          <Box>
            {totalDespachado.toFixed(2)} KG / {totalDespachar.toFixed(2)} KG
          </Box>
          <Badge borderRadius="md" variant="solid" colorScheme={badgeColor}>
            {props.estado}
          </Badge>
        </Flex>
        <Flex justifyContent="end" marginTop="2">
          <Link as={RouterLink} to={`/ordenes/${props.id}`}>
            <Button colorScheme="blue" size="sm">
              Ver Orden
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default OrdenItem;
