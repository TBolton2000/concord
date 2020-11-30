import React, { useState } from "react";
import { makeStyles, Button, Typography, TextField, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useResetPasswordMutation} from '../generated/graphql';
import { useParams, RouteComponentProps } from "react-router-dom";
import { createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        margin: "10px",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    textField: {
        width: '100%',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        margin: "auto", 
        outline: "none", 
        padding: "15px",
        display: 'flex',
        minWidth: "500px",
        maxWidth: "800px",
    }
  }),
);

const onTextFieldUpdate = (toUpdate : React.Dispatch<React.SetStateAction<string>>) => {
    return (e : React.ChangeEvent<HTMLInputElement>) => {
        toUpdate(e.target.value);
    };
}

export const ResetPassword: React.FC<RouteComponentProps> = () => {
    const [resetPassword] = useResetPasswordMutation();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const classes = useStyles({});
    const { token } = useParams();
    

    const areSame = (confirmed: string, regular: string) => {
        return confirmed == regular || confirmed === "";
    }
    
    const properPassword = () => {
        return ((newPassword.length > 9 && newPassword.length < 255) || newPassword.length == 0); 
    }

    const handleConfirmPassword = async (token, newPassword, confirmPassword) => {
        if (newPassword === confirmPassword){
          return await resetPassword({variables: {token, newPassword}});
        }
        return false;
    }
    
    return(
        <Grid container className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container direction="column" alignContent="center" alignItems="center" spacing={1}>
                    <Grid xs={12} item>
                        <Typography variant="h5">
                            Reset Password:
                        </Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Enter New Password" onChange={onTextFieldUpdate(setNewPassword)} className={classes.textField} helperText={!properPassword() ? 'Password must be between 9 and 255 characters' : ''} error={!properPassword()} type="password"></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Confirm Password" onChange={onTextFieldUpdate(setConfirmPassword)} className={classes.textField} helperText={!areSame(newPassword, confirmPassword) ? 'Passwords do not match' : ''} error={!areSame(newPassword, confirmPassword)} type="password"></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <Button variant="contained" onClick={() => handleConfirmPassword(token, newPassword, confirmPassword)}>
                            Update Password
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};