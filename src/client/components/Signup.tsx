import React, { useState } from "react";
import { makeStyles, TextField, Button, Paper, Grid, Typography } from "@material-ui/core";
import { createStyles, Theme } from '@material-ui/core/styles';
import { useRegisterMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";

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

export const SignUp: React.FC<RouteComponentProps> = ({history}) => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmedEmail, setConfirmedEmail] = useState("");
    const [signup] = useRegisterMutation();
    const classes = useStyles({});

    const areSame = (confirmed: string, regular: string) => {
        return confirmed == regular || confirmed === "";
    }
    
    const properEmail = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase()) || email === "";
    }
    
    const properPassword = () => {
        return ((password.length > 9 && password.length < 255) || password.length == 0); 
    }
    
    const printData = (...args) => {
        for(let arg of args)
        {
            console.log(arg);
        }
    }

    const submitForm = async () => {
        if (!(email === confirmedEmail && password === confirmedPassword && properEmail() && properPassword())) {
            // Reject, don't even try to register
            console.log("Info does not fit formatting");
            return;
        }
        const response = await signup({
            variables: {
                name,
                email,
                password
            }
        })
        history.push("/")
    }

    return(
        <Grid container className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container direction="column" alignContent="center" alignItems="center" spacing={1}>
                    <Grid xs={12} item>
                        <Typography variant="h5">
                            Sign Up:
                        </Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField id="name" label="Name" autoFocus value={name} className={classes.textField} onChange={onTextFieldUpdate(setName)}></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField id="email" label="Email" value={email} onChange={onTextFieldUpdate(setEmail)} className={classes.textField} helperText={!properEmail() ?  'Email is Invalid' : ''} error={!properEmail()}></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField id="confirm-email" label="Confirm Email" value={confirmedEmail} onChange={onTextFieldUpdate(setConfirmedEmail)} className={classes.textField} helperText={!areSame(confirmedEmail, email) ? 'Emails do not match' : ''} error={!areSame(confirmedEmail, email)}></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField id="password" label="Password" value={password} onChange={onTextFieldUpdate(setPassword)} className={classes.textField} helperText={!properPassword() ? 'Password must be between 9 and 255 characters' : ''} error={!properPassword()} type="password"></TextField>
                    </Grid>
                    <Grid xs={12} item >
                        <TextField id="confirm-password" label="Confirm Password" value={confirmedPassword} onChange={onTextFieldUpdate(setConfirmedPassword)} className={classes.textField} helperText={!areSame(confirmedPassword, password) ? 'Passwords do not match' : ''} error={!areSame(confirmedPassword, password)} type="password"></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <Button variant="contained" onClick={submitForm}>
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}