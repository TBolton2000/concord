import React, { useState } from "react";
import { makeStyles, Button, Typography, TextField, Paper } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useResetPasswordTokenMutation } from '../generated/graphql';
import Swal from 'sweetalert2';

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

export const ForgotPassword: React.FunctionComponent = () => {

    const [email, setEmail] = useState("");
    const [resetPasswordToken] = useResetPasswordTokenMutation();
    const classes = useStyles({});

    const resetToken = async (email) => {
        if (email != '') {
            Swal.fire({
                icon: 'success',
                title: 'Email Sent',
                text: "If their is an account associated with this email, an email will be sent",
            });
        }
        resetPasswordToken({variables: {email}})
    }

    return(
        <Grid container className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container direction="column" alignContent="center" alignItems="center" spacing={1}>
                    <Grid xs={12} item>
                        <Typography variant="h5">
                            Forgot Password:
                        </Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Enter Account Email" value={email} onChange={onTextFieldUpdate(setEmail)} type="email" className={classes.textField}></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <Button variant="contained" onClick={() => resetToken(email)}>
                            Send Email
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};