import { AppBar, makeStyles, Toolbar, Typography, Button, IconButton, Paper, Grid, Modal, TextField } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React, { Fragment, useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { useLogoutMutation, useMeQuery, useChangePasswordMutation } from '../generated/graphql';
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

const onTextFieldUpdate = (toUpdate : React.Dispatch<React.SetStateAction<string>>) => {
  return (e : React.ChangeEvent<HTMLInputElement>) => {
      toUpdate(e.target.value);
  };
}

export const Header: React.FunctionComponent = (props) => {
  const {data, loading} = useMeQuery();
  const [logout, {client}] = useLogoutMutation();
  const [changePassword] = useChangePasswordMutation();
  const isLoggedIn = data && data.me;
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const areSame = (confirmed: string, regular: string) => {
    return confirmed == regular || confirmed === "";
  }

  const properPassword = () => {
    return ((newPassword.length > 9 && newPassword.length < 255) || newPassword.length == 0); 
  }

  const logOutUser = async () => {
    await logout();
    setAccessToken("");
    await client.resetStore();
  }

  const handleConfirmPassword = async (oldPassword, newPassword, confirmPassword) => {
    if (newPassword === confirmPassword){
      changePassword({variables: {oldPassword, newPassword}})
      return true
    }
    return false
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
                    <IconButton color="inherit" key={0} onClick={() => setOpen(true)}><SettingsIcon color="inherit" /></IconButton>,
                    <Fragment key={1}>{data.me.name}</Fragment>,
                    <Button onClick={logOutUser} key={2}>Log Out</Button>,
                    <Modal open={open} onClose={()=> setOpen(false)} key={3} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      
                    }}>
                      <Paper style={{
                        minWidth: "500px",
                        maxWidth: "800px",
                        margin: "auto",
                        padding: "10px"
                        }}>
                        <Grid container direction="column" alignContent="center" alignItems="center" spacing={1}>
                          <Grid xs={12} item>
                            Name: {data.me.name}
                          </Grid>
                          <Grid xs={12} item>
                            Email: {data.me.email}
                          </Grid>
                            Change Password:
                            <TextField id="old-password" label="Enter Old Password" autoFocus value={oldPassword} onChange={onTextFieldUpdate(setOldPassword)} ></TextField>
                            <TextField id="new-password" label="Enter New Password" onChange={onTextFieldUpdate(setNewPassword)} helperText={!properPassword() ? 'Password must be between 9 and 255 characters' : ''} error={!properPassword()} type="password"></TextField>
                            <TextField id="confirm-password" label="Confirm Password" onChange={onTextFieldUpdate(setConfirmPassword)} helperText={!areSame(newPassword, confirmPassword) ? 'Passwords do not match' : ''} error={!areSame(newPassword, confirmPassword)} type="password"></TextField>
                            <Button onClick={() => handleConfirmPassword(oldPassword, newPassword, confirmPassword)}>
                              Change Password
                            </Button>
                          <Grid xs={12} item>
                            <Button onClick={() => setOpen(false)}>
                              Close
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Modal>
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

