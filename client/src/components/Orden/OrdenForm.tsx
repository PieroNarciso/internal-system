import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spacer,
  StackProps,
  VStack,
} from '@chakra-ui/react';
import React, { Fragment, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchBusinessEntries } from '@/store/business/business.thunks';
import { ItemUpdate, ItemCreate } from '@/interfaces/item.interface';
import { MdRemoveCircle } from 'react-icons/md';
import { Estado } from '@/types';

interface OrdenFormProps extends Pick<StackProps, 'spacing'> {
  empresaIdValue: number;
  empresaIdHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  numOrdenValue: string;
  numOrdenHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  estado?: Estado;
  estadoHandler?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  items: ItemCreate[] | ItemUpdate[];
  addNewItem: () => void;
  deleteItem: (index: number) => void;
  changeNameValueInItem: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  changeDespacharValueInItem: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const OrdenForm: React.FC<OrdenFormProps> = ({ spacing, ...props }) => {
  const dispatch = useAppDispatch();
  const empresas = useAppSelector((state) => state.business.businesses);

  useEffect(() => {
    if (empresas.length === 0) {
      dispatch(fetchBusinessEntries());
    }
  }, []);

  return (
    <Fragment>
      <VStack spacing={spacing ? spacing : '2'}>
        <FormControl isRequired>
          <FormLabel>Empresa</FormLabel>
          <Select
            value={props.empresaIdValue || ''}
            onChange={props.empresaIdHandler}
            required
          >
            <option value="" hidden>
              None
            </option>
            {empresas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.razonSocial}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>N??mero de orden</FormLabel>
          <Input
            placeholder="N??mero de orden"
            type="text"
            value={props.numOrdenValue}
            onChange={props.numOrdenHandler}
            required
          />
        </FormControl>
      </VStack>
      <Flex justifyContent="space-between" width="full" marginTop="4">
        {props.estado && props.estadoHandler ? (
          <Select value={props.estado} onChange={props.estadoHandler} marginRight="5" required>
            <option value="" hidden>
              Estado
            </option>
            <option>{Estado.ACTIVO.toUpperCase()}</option>
            <option>{Estado.COMPLETADO.toUpperCase()}</option>
            <option>{Estado.INACTIVO.toUpperCase()}</option>
          </Select>
        ) : (
          <Spacer />
        )}
        <Button colorScheme="green" onClick={props.addNewItem}>
          Agregar Item
        </Button>
      </Flex>
      <VStack width="full" marginTop="2">
        <Grid
          templateColumns="repeat(12, 1fr)"
          width="full"
          gap={2}
          alignItems="center"
        >
          <GridItem colSpan={7}>
            <FormLabel>Item</FormLabel>
          </GridItem>
          <GridItem colSpan={4}>
            <FormLabel>Peso</FormLabel>
          </GridItem>
          {props.items.map((item, index) => (
            <Fragment key={index}>
              <GridItem colSpan={7}>
                <Input
                  value={item.name}
                  onChange={(event) =>
                    props.changeNameValueInItem(index, event)
                  }
                  type="text"
                />
              </GridItem>
              <GridItem colSpan={4}>
                <NumberInput precision={2}>
                  <NumberInputField
                    value={item.totalDespachar}
                    onChange={(event) =>
                      props.changeDespacharValueInItem(index, event)
                    }
                    type="number"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </GridItem>
              <GridItem
                colSpan={1}
                justifyContent="center"
                display="flex"
                alignItems="center"
              >
                <IconButton
                  type="button"
                  colorScheme="blackAlpha"
                  onClick={() => props.deleteItem(index)}
                  size="sm"
                  aria-label="Remove item"
                  icon={<MdRemoveCircle />}
                />
              </GridItem>
            </Fragment>
          ))}
        </Grid>
      </VStack>
    </Fragment>
  );
};

export default OrdenForm;
