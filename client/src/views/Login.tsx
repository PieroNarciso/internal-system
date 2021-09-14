import React from 'react';
import { Button, Grid, makeStyles, Paper, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper elevation={0} variant="outlined" className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Usuario"
            placeholder="Nombre de usuario"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contraseña"
            placeholder="Contraseña"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button>Ingresar</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
