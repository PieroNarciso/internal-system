import React from 'react';
import Grid from '@material-ui/core/Grid';

import OrdenItem from '@/components/Orden/OrdenItem';
import { Orden } from '@/interfaces/orden.interface';

interface OrdenListProps {
  ordenes: Orden[];
}

const OrdenList: React.FC<OrdenListProps> = ({ ordenes }) => {
  return (
    <Grid container>
      {ordenes.map((orden) => (
        <Grid item key={orden.id}>
          <OrdenItem
            id={orden.id}
            items={orden.items}
            empresa={orden.empresa}
            numOrden={orden.numOrden}
            estado={orden.estado}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default OrdenList;
