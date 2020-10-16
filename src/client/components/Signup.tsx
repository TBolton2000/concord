import React, { useState } from "react";
import { Card, TextField, Button, CardContent, Paper, Link, Tabs, Tab } from "@material-ui/core";

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
            <Paper square>
                <Card>
                    <CardContent>
                        <Tabs indicatorColor="primary" textColor="primary" value={1}>
                            <Link href='/login'><Tab label="Login" /></Link>
                            <Tab label="Sign Up" />
                        </Tabs>
                        <TextField label="Name" onChange={onTextFieldUpdate(setName)}></TextField>
                        <TextField label="Username" onChange={onTextFieldUpdate(setUserName)}></TextField>
                        <TextField label="Email" onChange={onTextFieldUpdate(setEmail)} helperText={!properEmail() ?  'Email is Invalid' : ''} error={!properEmail()}></TextField>
                        <TextField label="Confirm Email" onChange={onTextFieldUpdate(setConfirmedEmail)} helperText={!areSame(confirmedEmail, email) ? 'Emails do not match' : ''} error={!areSame(confirmedEmail, email)}></TextField>
                        <TextField label="Password" onChange={onTextFieldUpdate(setPassword)} helperText={!properPassword() ? 'Password must be between 9 and 255 characters' : ''} error={!properPassword()} type="password"></TextField>
                        <TextField label="Confirm Password" onChange={onTextFieldUpdate(setConfirmedPassword)} helperText={!areSame(confirmedPassword, password) ? 'Passwords do not match' : ''} error={!areSame(confirmedPassword, password)} type="password"></TextField>
                        <Button onClick={()=>{printData(name, userName, email, password)}}>
                            Sign Up
                        </Button>
                    </CardContent>
                </Card>
            </Paper>
        </div>
    );
}