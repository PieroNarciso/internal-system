import React from 'react';

import OrdenItem from '@/components/Orden/OrdenItem';
import { Orden } from '@/interfaces/orden.interface';
import { VStack } from '@chakra-ui/react';

interface OrdenListProps {
  ordenes: Orden[];
}

const OrdenList: React.FC<OrdenListProps> = ({ ordenes }) => {
  return (
    <VStack spacing="2">
      {ordenes.map(orden => (
        <OrdenItem
          key={orden.id}
          id={orden.id}
          empresa={orden.empresa}
          numOrden={orden.numOrden}
          items={orden.items}
          estado={orden.estado}
        />
      ))}
    </VStack>
  );
};

export default OrdenList;
