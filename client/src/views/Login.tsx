import React, { Fragment, useState } from 'react';

import { loginUser } from '@/store/user/user.thunks';
import { useAppDispatch } from '@/hooks';
import { Box, Flex, Input, InputGroup, FormControl, VStack, Button } from '@chakra-ui/react';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const loginOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(
        loginUser({
          username,
          password,
        })
      ).unwrap();
    } catch (err) {
      console.log(err);
    } finally {
      setUsername('');
      setPassword('');
    }
  };

  return (
    <Fragment>
      <Box borderRadius="lg" borderWidth="1px" p="4">
        <form onSubmit={loginOnSubmit}>
          <VStack spacing="3">
          <FormControl>
            <InputGroup>
              <Input
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={usernameHandler}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={passwordHandler}
              />
            </InputGroup>
          </FormControl>
          <Flex width="full" justifyContent="end">
            <Button type="submit">Ingresar</Button>
          </Flex>
          </VStack>
        </form>
      </Box>
    </Fragment>
  );
};

export default Login;
