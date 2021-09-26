import React, { Fragment } from 'react';
import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Link,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';
import MainDrawer from '@/components/UI/Drawer';

const Layout: React.FC = ({ children }) => {
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();

  return (
    <Fragment>
      <Flex p="2" bgColor="gray.200" alignItems="center">
        <Box p="2">
          <Flex align="center">
            <IconButton
              aria-label="Drawer button"
              icon={<MdMenu />}
              onClick={drawerOnOpen}
            />
            <Heading size="md" marginLeft="2">
              <RouterLink to="/">Texaf App</RouterLink>
            </Heading>
          </Flex>
        </Box>
        <Spacer />
        <Box>
          <Link as={RouterLink} to="/login">
            <Button size="sm" colorScheme="gray">
              Ingresar
            </Button>
          </Link>
        </Box>
      </Flex>
      <MainDrawer isOpen={drawerIsOpen} onClose={drawerOnClose} />
      <Container marginY="4">{children!}</Container>
    </Fragment>
  );
};

export default Layout;
