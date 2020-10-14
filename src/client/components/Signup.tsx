import React, { useState } from "react";
import { Card, TextField, Button, CardContent, Paper, Link, Tabs, CardHeader, Tab, ValidatorForm, TextValidator } from "@material-ui/core";

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
    const [confirmedpassword, setConfirmedPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmedemail, setConfirmedEmail] = useState("");

    const validateEmail = () => {
        return confirmedemail == email || confirmedemail === "";
    }

    const validatePassword = () => {
        return confirmedpassword == password || confirmedpassword === "";
    }

    const properEmail = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(re.test(String(email).toLowerCase()));
        return re.test(String(email).toLowerCase()) || email === "";
    }

    const properPassword = () => {
        if ((password.length < 9 || password.length > 255) && password.length > 0){
            return false
        } else {
            return true
        }
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
                                <Tabs indicatorColor="primary" textColor="primary">
                                    <Tab label="Sign Up" />
                                    <Link href='/login'><Tab label="Login" /></Link>
                                </Tabs>
                            </CardContent>
                            <CardContent>
                                <TextField label="Name" onChange={onTextFieldUpdate(setName)}></TextField>
                            </CardContent>
                            <CardContent>
                                <TextField label="Username" onChange={onTextFieldUpdate(setUserName)}></TextField>
                            </CardContent>
                            <CardContent>
                                <TextField error={!properEmail()} label="Email" onChange={onTextFieldUpdate(setEmail)} helperText={!properEmail() ?  'Email is Invalid' : ''}></TextField>
                            </CardContent>
                            
                            <CardContent>
                                <TextField error = {!validateEmail()} label="Confirm Email" onChange={onTextFieldUpdate(setConfirmedEmail)} helperText={!validateEmail() ? 'Emails do not match' : ''}></TextField>
                            </CardContent>
                            <CardContent>
                                <TextField error = {!properPassword()} label="Password" onChange={onTextFieldUpdate(setPassword)} helperText={!properPassword() ? 'Password must be between 9 and 255 characters' : ''}></TextField>
                            </CardContent>
                            <CardContent>
                                <TextField error = {!validatePassword()} label="Confirm Password" onChange={onTextFieldUpdate(setConfirmedPassword)} helperText={!validatePassword() ? 'Passwords do not match' : ''}></TextField>
                            </CardContent>
                            <CardContent>
                                <Button onClick={()=>{printData(name, userName, email, password)}}>
                                    SUBMIT
                                </Button>
                            </CardContent>
                            
                    </Card>
            </Paper>

        </div>
    );
}