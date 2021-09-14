import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Fragment, useState } from 'react';

const Layout: React.FC = ({ children }) => {
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (newState: boolean) => {
    setDrawerState(newState);
  };

  return (
    <Fragment>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Title
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerState} onClose={() => toggleDrawer(false)}>
        Drawer
      </Drawer>
      <Container>{children!}</Container>
    </Fragment>
  );
};

export default Layout;
