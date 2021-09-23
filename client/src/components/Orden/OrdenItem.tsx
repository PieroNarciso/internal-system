import { Orden } from '@/interfaces/orden.interface';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

interface OrdenItemProps extends Orden {}

const OrdenItem: React.FC<OrdenItemProps> = (props) => {
  let totalDespachado: number = 0;
  let totalDespachar: number = 0;

  for (const item of props.items) {
    totalDespachado += item.totalDespachado;
    totalDespachar += item.totalDespachar;
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>{props.empresa.razonSocial}</Typography>
        <Typography>{props.estado.toUpperCase()}</Typography>
        <Typography>
          {totalDespachado.toFixed(2)} KG / {totalDespachar.toFixed(2)} KG
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/ordenes/${props.id}`}>
          <Button>Ver Orden</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default OrdenItem;
