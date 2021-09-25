import { Orden } from '@/interfaces/orden.interface';
import { Badge, Box, Link, Flex, Spacer } from '@chakra-ui/react';
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

  return (
    <Box borderColor="gray.400" borderWidth="thin" width="full">
      <Flex direction="column">
        <Flex alignItems="center">
          <Badge borderRadius="full" height="5" width="5" />
          <Box as="h4" isTruncated>
            {props.empresa.razonSocial}
          </Box>
          <Spacer />
          <Box>{props.numOrden}</Box>
        </Flex>
        <Flex>
          <Box>
            {totalDespachado} KG / {totalDespachar} KG
          </Box>
        </Flex>
        <Flex justifyContent="end">
          <Link as={RouterLink} to={`/ordenes/${props.id}`}>
            Ver Orden
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default OrdenItem;
