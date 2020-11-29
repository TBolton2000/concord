import { makeStyles, Typography, Button, Paper, Grid, Modal, TextField } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useLogoutMutation, MeQuery, useChangePasswordMutation } from '../generated/graphql';
import { setAccessToken } from './accessToken';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
        width: '60%',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        minWidth: "500px",
        maxWidth: "800px",
        margin: "auto",
        padding: "10px"
    }
  }),
);

interface Props{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: MeQuery;
};

const onTextFieldUpdate = (toUpdate : React.Dispatch<React.SetStateAction<string>>) => {
    return (e : React.ChangeEvent<HTMLInputElement>) => {
        toUpdate(e.target.value);
    };
}

export const UserSettingsModal: React.FC<Props> = ({open, setOpen, data}) => {
    const [changePassword] = useChangePasswordMutation();
    const [logout, {client}] = useLogoutMutation();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const classes = useStyles({});

    const logOutUser = async () => {
        await logout();
        setAccessToken("");
        await client.resetStore();
    }

    const areSame = (confirmed: string, regular: string) => {
        return confirmed == regular || confirmed === "";
    }
    
      const properPassword = () => {
        return ((newPassword.length > 9 && newPassword.length < 255) || newPassword.length == 0); 
    }

    const handleConfirmPassword = async (oldPassword, newPassword, confirmPassword) => {
        if (newPassword === confirmPassword){
          return await changePassword({variables: {oldPassword, newPassword}});
        }
        return false;
    }

    return(

        <Modal open={open} onClose={()=> setOpen(false)} key={3} className={classes.modal}>
            <Paper className={classes.paper}>
            <Grid container direction="column" alignContent="center" alignItems="center" spacing={1}>
                <Grid xs={12} item>
                    <Typography variant="h4">
                        Account Settings
                    </Typography>
                </Grid>
                <Grid xs={12} item>
                    <Typography>
                        Name: {data.me.name}
                    </Typography>
                </Grid>
                <Grid xs={12} item>
                    <Typography>
                        Email: {data.me.email}
                    </Typography>
                </Grid>
                <Typography variant="h5">
                    Change Password:
                </Typography>
                <TextField id="old-password" label="Enter Old Password" autoFocus value={oldPassword} className={classes.textField} onChange={onTextFieldUpdate(setOldPassword)} type="password"></TextField>
                <TextField id="new-password" label="Enter New Password" value={newPassword} onChange={onTextFieldUpdate(setNewPassword)} className={classes.textField} helperText={!properPassword() ? 'Password must be between 9 and 255 characters' : ''} error={!properPassword()} type="password"></TextField>
                <TextField id="confirm-password" label="Confirm Password" value={setConfirmPassword} onChange={onTextFieldUpdate(setConfirmPassword)} className={classes.textField} helperText={!areSame(newPassword, confirmPassword) ? 'Passwords do not match' : ''} error={!areSame(newPassword, confirmPassword)} type="password"></TextField>
                <Button onClick={() => handleConfirmPassword(oldPassword, newPassword, confirmPassword)}>
                    Change Password
                </Button>
                <Grid xs={12} item>
                    <Button onClick={logOutUser} key={2}>Log Out</Button>
                    <Button onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
            </Paper>
        </Modal>
    );
}