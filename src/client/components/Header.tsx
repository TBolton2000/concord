import { AppBar, makeStyles, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const Header: React.FunctionComponent = (props) => {
  let isloggedin = false
  const classes = useStyles({});
    return (
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Concord
          </Typography>
          <div>
            {isloggedin
              ? [
                  <IconButton color="inherit"><SettingsIcon color="inherit"/></IconButton>,
                  <Fragment>username</Fragment>
                ]
              : [
                  <Button color="inherit" href="/login">Login</Button>, 
                  <Button color="inherit" href="/signup">Sign up</Button>
                ] 
            }
          </div>
        </Toolbar>
      </AppBar>
    );

};

