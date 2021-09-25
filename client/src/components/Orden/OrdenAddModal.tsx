import React, { useEffect, useState } from 'react';

import { useAppDispatch } from '@/hooks';
import { ItemCreate } from '@/interfaces/item.interface';
import { createOrden } from '@/store/orden/orden.thunks';
import { fetchBusinessEntries } from '@/store/business/business.thunks';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import OrdenForm from '@/components/Orden/OrdenForm';

interface OrdenAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrdenAddModal: React.FC<OrdenAddProps> = ({ onClose, isOpen }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [empresaId, setEmpresaId] = useState<number>(0);
  const [numOrden, setNumOrden] = useState('');
  const [items, setItems] = useState<ItemCreate[]>([]);

  const empresaIdHandler = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setEmpresaId(parseInt(event.target.value));
  const numOrdenHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNumOrden(event.target.value);

  const addNewItem = () => {
    setItems((prevState) => {
      return [...prevState, { name: '', totalDespachar: 0 }];
    });
  };
  const deleteItem = (index: number) => {
    setItems((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };
  const changeNameValueInItem = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItems((prevState) => {
      const newState = [...prevState];
      newState[index].name = event.target.value;
      return newState;
    });
  };
  const changeDespacharValueInItem = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItems((prevState) => {
      const newState = [...prevState];
      newState[index].totalDespachar = parseFloat(event.target.value);
      return newState;
    });
  };

  const createOrdenOnSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await dispatch(
        createOrden({
          empresaId,
          numOrden,
          items,
        })
      ).unwrap();
      onClose();
    } catch {}
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchBusinessEntries());
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={createOrdenOnSubmit}>
          <ModalHeader>Crear Orden de Servicio</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflow="auto">
            <OrdenForm
              empresaIdValue={empresaId}
              empresaIdHandler={empresaIdHandler}
              numOrdenValue={numOrden}
              numOrdenHandler={numOrdenHandler}
              items={items}
              addNewItem={addNewItem}
              deleteItem={deleteItem}
              changeNameValueInItem={changeNameValueInItem}
              changeDespacharValueInItem={changeDespacharValueInItem}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="button" colorScheme="blackAlpha" onClick={onClose}>
              Cerrar
            </Button>
            <Button type="submit" marginLeft="3" isLoading={isLoading} colorScheme="blue">
              Guardar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default OrdenAddModal;
