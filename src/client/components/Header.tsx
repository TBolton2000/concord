import { AppBar, makeStyles, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { setAccessToken } from './accessToken';

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
  const {data, loading} = useMeQuery();
  const [logout, {client}] = useLogoutMutation();
  const isLoggedIn = data && data.me;

  const logOutUser = async () => {
    await logout();
    setAccessToken("");
    await client.resetStore();
  }

  const classes = useStyles({});
    return (
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Concord
          </Typography>
          <div>
            {loading
            ? null :
              isLoggedIn
                ? [
                    <IconButton color="inherit" key={0}><SettingsIcon color="inherit"/></IconButton>,
                    <Fragment key={1}>{data.me.name}</Fragment>,
                    <Button onClick={logOutUser} key={2}>Log Out</Button>
                  ]
                : [
                    <Button color="inherit" href="/login" key={0}>Login</Button>, 
                    <Button color="inherit" href="/signup" key={1}>Sign up</Button>
                  ] 
            }
          </div>
        </Toolbar>
      </AppBar>
    );

};

