import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import RouterIcon from '@material-ui/icons/Storage';
import FetchIcon from '@material-ui/icons/CloudDownload';
import StyledIcon from '@material-ui/icons/Style';
import LazyIcon from '@material-ui/icons/SystemUpdateAlt';
import React from 'react';
import { NavLink } from 'react-router-dom';

class NavLinkMui extends React.Component<any> {
  render() {
      const { forwardedRef, to, ...props } = this.props
      return <NavLink {...props} ref={forwardedRef} to={to} />
  }
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  }),
);

export const SideMenu: React.FunctionComponent = () => {
  const classes = useStyles({});
  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem button component={NavLinkMui} to='/'>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={NavLinkMui} to='/users-list'>
          <ListItemIcon>
            <FetchIcon />
          </ListItemIcon>
          <ListItemText primary='Users List' />
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button component={NavLinkMui} to='/login'>
          <ListItemIcon>
            <FetchIcon />
          </ListItemIcon>
          <ListItemText primary='Login' />
        </ListItem>
        <ListItem button component={NavLinkMui} to='/signup'>
          <ListItemIcon>
            <LazyIcon />
          </ListItemIcon>
          <ListItemText primary='Sign Up' />
        </ListItem>
        <ListItem button component={NavLinkMui} to='/dashboard-upper'>
          <ListItemIcon>
            <StyledIcon />
          </ListItemIcon>
          <ListItemText primary='Dashboard Upper' />
        </ListItem>
        <ListItem button component={NavLinkMui} to='/dashboard-lower'>
          <ListItemIcon>
            <RouterIcon />
          </ListItemIcon>
          <ListItemText primary='Dashboard Lower' />
        </ListItem>
      </List>
    </Drawer>
  );
};
