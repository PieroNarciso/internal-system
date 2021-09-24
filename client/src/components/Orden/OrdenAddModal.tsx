import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { ItemCreate } from '@/interfaces/item.interface';
import { createOrden } from '@/store/orden/orden.thunks';
import { fetchBusinessEntries } from '@/store/business/business.thunks';
import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';

interface OrdenAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrdenAddModal: React.FC<OrdenAddProps> = ({ onClose, isOpen }) => {
  const dispatch = useAppDispatch();
  const empresas = useAppSelector(state => state.business.businesses);
  const [empresaId, setEmpresaId] = useState<number>(0);
  const [numOrden, setNumOrden] = useState('');
  const [itemstoCreate, setItemsToCreate] = useState<ItemCreate[]>([]);

  useEffect(() => {
    dispatch(fetchBusinessEntries());
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Crear Orden de Servicio
        </ModalHeader>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default OrdenAddModal;
