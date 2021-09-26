import React, { CSSProperties } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  Button,
  DrawerHeader,
  Stack,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { MdAccountCircle, MdArrowForward } from 'react-icons/md';
import { useAppSelector } from '@/hooks';

interface MainDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MainDrawer: React.FC<MainDrawerProps> = ({ isOpen, onClose }) => {
  const navLinkStyle: CSSProperties = { width: '100%' };
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody>
          <Stack>
            <NavLink to="/" exact style={navLinkStyle}>
              <Button onClick={onClose} width="full">Ordenes</Button>
            </NavLink>
            <NavLink to="/businesses" exact style={navLinkStyle}>
              <Button onClick={onClose} width="full">Empresas</Button>
            </NavLink>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          {isAuthenticated ? (
            <Button width="full" onClick={onClose} rightIcon={<MdArrowForward />}>Logout</Button>
          ) : (
            <NavLink to="/login" exact style={navLinkStyle}>
              <Button
                onClick={onClose}
                colorScheme="green"
                width="full"
                rightIcon={<MdAccountCircle />}
              >
                Ingresar
              </Button>
            </NavLink>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MainDrawer;
