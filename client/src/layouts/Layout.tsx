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

const Layout: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <Flex p="2" bgColor="gray.200" alignItems="center">
        <Box p="2">
          <Flex align="center">
            <IconButton
              aria-label="Drawer button"
              icon={<MdMenu />}
              onClick={onOpen}
            />
            <Heading size="md" marginLeft="2">
              Texaf App
            </Heading>
          </Flex>
        </Box>
        <Spacer />
        <Box>
          <Link px="3" py="2" bgColor="blue.400" rounded="md" textColor="white" as={RouterLink} to="/login">Ingresar</Link>
        </Box>
      </Flex>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
          </DrawerBody>
          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Container marginTop="4">{children!}</Container>
    </Fragment>
  );
};

export default Layout;
