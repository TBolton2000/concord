import React, { useState } from "react";
import { TextField, Button, Paper, Tabs, Tab, Grid } from "@material-ui/core";

const onTextFieldUpdate = (toUpdate : React.Dispatch<React.SetStateAction<string>>) => {
    return (e : React.ChangeEvent<HTMLInputElement>) => {
        toUpdate(e.target.value);
    };
}
interface SignUpProps{
}
export const SignUp: React.FC<SignUpProps> = () => {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmedEmail, setConfirmedEmail] = useState("");
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

    return(
        <div>
            <Paper style={{
                maxWidth: "500px",
                margin: "auto"
            }}>
                <Grid container direction="column" alignContent="center" alignItems="center" spacing={1}>
                    <Grid xs={12} item>
                        <Tabs indicatorColor="primary" textColor="primary" variant="fullWidth" value={1}>
                            <Tab label="Login" href="/login"/>
                            <Tab label="Sign Up" />
                        </Tabs>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Name" autoFocus fullWidth onChange={onTextFieldUpdate(setName)}></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Username" fullWidth onChange={onTextFieldUpdate(setUserName)}></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Email" fullWidth onChange={onTextFieldUpdate(setEmail)} helperText={!properEmail() ?  'Email is Invalid' : ''} error={!properEmail()}></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Confirm Email" fullWidth onChange={onTextFieldUpdate(setConfirmedEmail)} helperText={!areSame(confirmedEmail, email) ? 'Emails do not match' : ''} error={!areSame(confirmedEmail, email)}></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Password" fullWidth onChange={onTextFieldUpdate(setPassword)} helperText={!properPassword() ? 'Password must be between 9 and 255 characters' : ''} error={!properPassword()} type="password"></TextField>
                    </Grid>
                    <Grid xs={12} item >
                        <TextField label="Confirm Password" fullWidth onChange={onTextFieldUpdate(setConfirmedPassword)} helperText={!areSame(confirmedPassword, password) ? 'Passwords do not match' : ''} error={!areSame(confirmedPassword, password)} type="password"></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <Button variant="contained" onClick={()=>{printData(name, userName, email, password)}}>
                            Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}