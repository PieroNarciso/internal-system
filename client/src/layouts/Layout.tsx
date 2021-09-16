import React, { Fragment, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

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
