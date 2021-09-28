import React, { useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

import OrdenForm from '@/components/Orden/OrdenForm';
import { OrdenDetail } from '@/interfaces/orden.interface';
import {
  ItemCreateWithLocalId,
  ItemUpdate,
  Item,
} from '@/interfaces/item.interface';
import { nanoid } from '@reduxjs/toolkit';
import { Estado } from '@/types';
import { useAppDispatch } from '@/hooks';

interface OrdenUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  orden: OrdenDetail;
}

const OrdenUpdateModal: React.FC<OrdenUpdateModalProps> = ({
  isOpen,
  onClose,
  orden,
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [empresaId, setEmpresaId] = useState(orden.empresa.id);
  const [numOrden, setNumOrden] = useState(orden.numOrden);
  const [items, setItems] = useState<
    (Item | ItemUpdate | ItemCreateWithLocalId)[]
  >([...orden.items]);
  const [estado, setEstado] = useState(orden.estado);

  const empresaIdHandler = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setEmpresaId(parseInt(event.target.value));
  const numOrdenHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNumOrden(event.target.value);
  const estadoHandler = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setEstado(event.target.value as Estado);
  const addNewItem = () => {
    setItems((prevItems) => {
      return [...prevItems, { id: nanoid(), nombre: '', totalDespachar: 0 }];
    });
  };
  const deleteItem = (id: string | number) => {
    setItems((prevItems) => {
      const newState = [...prevItems];
      return newState.filter((item) => item.id !== id);
    });
  };
  const changeNameValueInItem = (
    id: string | number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItems((prevItems) => {
      const newState = [...prevItems];
      const item = newState.find((item) => item.id === id);
      if (item) item.nombre = event.target.value;
      return newState;
    });
  };
  const changeDespacharValueInItem = (
    id: string | number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItems((prevItems) => {
      const newState = [...prevItems];
      const item = newState.find((item) => item.id === id);
      if (item)
        item.totalDespachar =
          parseFloat(event.target.value) || item.totalDespachar;
      return newState;
    });
  };

  const updateOrdenOnSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={updateOrdenOnSubmit}>
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
              estado={estado}
              estadoHandler={estadoHandler}
              changeNameValueInItem={changeNameValueInItem}
              changeDespacharValueInItem={changeDespacharValueInItem}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="button" colorScheme="blackAlpha" onClick={onClose}>
              Cerrar
            </Button>
            <Button
              type="submit"
              marginLeft="3"
              isLoading={isLoading}
              colorScheme="blue"
            >
              Guardar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default OrdenUpdateModal;
