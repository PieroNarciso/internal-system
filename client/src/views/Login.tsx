import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { loginUser } from '@/store/user/user.thunks';
import { useAppDispatch } from '@/hooks';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const loginOnSubmit = async () => {
    try {
      await dispatch(
        loginUser({
          username,
          password,
        })
      ).unwrap();
    } catch (err) {
      console.log();
    } finally {
      setUsername('');
      setPassword('');
    }
  };

  return (
    <Paper elevation={0} variant="outlined" className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Usuario"
            placeholder="Nombre de usuario"
            fullWidth
            required
            value={username}
            onChange={handleUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contraseña"
            placeholder="Contraseña"
            fullWidth
            required
            value={password}
            onChange={handlePassword}
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={loginOnSubmit}>Ingresar</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
