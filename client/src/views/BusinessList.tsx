import React, { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Stack, FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';

import { createBusinessEntry, fetchBusinessEntries } from '@/store/business/business.thunks';

const BusinessList: React.FC = () => {
  const dispatch = useAppDispatch();
  const empresas = useAppSelector(state => state.business.businesses);
  const [razonSocial, setRazonSocial] = useState('');
  const [ruc, setRuc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const razonSocialHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRazonSocial(event.target.value);
  const rucHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRuc(event.target.value);

  useEffect(() => {
    dispatch(fetchBusinessEntries())
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(createBusinessEntry({
        razonSocial,
        ruc,
      })).unwrap(); 
      setRazonSocial('');
      setRuc('');
    } catch (err) {}
    finally {
      setIsLoading(false);
    }
  }

  return (
    <Fragment>
      <Box borderWidth="1px" borderRadius="lg" p="4">
      <form onSubmit={onSubmit}>
        <Stack spacing="3">
        <FormControl isRequired>
          <FormLabel>Razón Social</FormLabel>
          <Input text="text" placeholder="Razón Social" required value={razonSocial} onChange={razonSocialHandler}/>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>RUC</FormLabel>
          <Input text="text" placeholder="RUC" required value={ruc} onChange={rucHandler}/>
        </FormControl>
        <Button type="submit" colorScheme="blue" size="sm" isLoading={isLoading}>Agregar</Button>
        </Stack>
      </form>
      </Box>

      <Stack borderWidth="1px" borderRadius="lg" overflow="auto" marginTop="5">
      {empresas.map(empresa => (
        <Box px="4" py="2" key={empresa.id}>{empresa.razonSocial}</Box>
      ))}
      </Stack>
    </Fragment>
  )
}

export default BusinessList;
