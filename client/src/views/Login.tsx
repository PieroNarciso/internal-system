import React, { Fragment, useState } from 'react';

import { loginUser } from '@/store/user/user.thunks';
import { useAppDispatch } from '@/hooks';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  FormControl,
  VStack,
  Button,
  FormLabel,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const showPasswordToggle = () => setShowPassword((prevState) => !prevState);

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
            <FormControl isRequired>
              <FormLabel>Nombre de usuario</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={usernameHandler}
                  required
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  value={password}
                  onChange={passwordHandler}
                />
                <InputRightElement>
                  <IconButton
                    onClick={showPasswordToggle}
                    aria-label="Show password"
                    icon={showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  />
                </InputRightElement>
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
