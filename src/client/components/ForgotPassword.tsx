import React, { useState } from "react";
import { makeStyles, Button, Typography, TextField, Paper } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useResetPasswordTokenMutation } from '../generated/graphql';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    textField: {
        width: '100%',
    },
    paper: {
        minWidth: "500px",
        maxWidth: "800px",
        margin: "auto",
        padding: "10px"
    }})
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
      resetPasswordToken({variables: {email}})
      console.log('passed');
    }

    return(
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
                    <Button variant="contained" href="/forgotpassword" onClick={() => resetToken(email)}>
                        Send Email
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};