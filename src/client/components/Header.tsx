import { AppBar, makeStyles, Toolbar, Typography, Button, IconButton, Paper, Grid, Modal, TextField } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React, { Fragment, useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { useMeQuery } from '../generated/graphql';
import { UserSettingsModal } from './UserSettingsModal';

import "../../../assets/css/Fonts.css"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: "#1761A0"
    },
    title: {
      flexGrow: 1,
    },
    titleStyles: {
      fontSize: 24,
      fontFamily: 'Monoton'
    },
    titleImage: {
      background: "white",
      verticalAlign: "middle",
      borderRadius: 34,
      width: 34,
      height: 34,
    }
  }),
);

const onTextFieldUpdate = (toUpdate : React.Dispatch<React.SetStateAction<string>>) => {
  return (e : React.ChangeEvent<HTMLInputElement>) => {
      toUpdate(e.target.value);
  };
}

export const Header: React.FunctionComponent = (props) => {
  const {data, loading} = useMeQuery();
  const isLoggedIn = data && data.me;
  const [open, setOpen] = useState(false);

  const classes = useStyles({});
    return (
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>   
            <a href="/"><img className={classes.titleImage} src={".../../../assets/images/LogoOnly.png"}/></a>          
            <Button color="inherit" className={classes.titleStyles} href="/">Concord</Button>
          </Typography>
          <div>
            {loading
            ? null :
              isLoggedIn
                ? [
                    <IconButton color="inherit" key={0} onClick={() => setOpen(true)}><SettingsIcon color="inherit" /></IconButton>,
                    <Fragment key={1}>{data.me.name}</Fragment>,
                    <UserSettingsModal  key={2} open={open} setOpen={setOpen} data={data}></UserSettingsModal>
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

