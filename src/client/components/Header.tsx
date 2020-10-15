import { AppBar, makeStyles, Toolbar, Typography, Button } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);



export const Header: React.FunctionComponent = ({isloggedin, username}) => {
  isloggedin = true
  const classes = useStyles({});
  if (!isloggedin) {
    return (
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Concord
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign up</Button>
        </Toolbar>
      </AppBar>
    );
  }
  
  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Concord
        </Typography>
        <Button color="inherit"><SettingsIcon color="inherit"/></Button>
        <Button color="inherit">username</Button>
      </Toolbar>
    </AppBar>
  );

};

