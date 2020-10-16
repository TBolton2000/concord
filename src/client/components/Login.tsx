import React, { useState } from "react";
import { Card, TextField, Button, CardContent, Paper, Tab, Tabs, Link, CardHeader } from "@material-ui/core";

const onTextFieldUpdate = (toUpdate : React.Dispatch<React.SetStateAction<string>>) => {
    return (e : React.ChangeEvent<HTMLInputElement>) => {
        toUpdate(e.target.value);
    };
}

interface LoginProps{

}

export const Login: React.FC<LoginProps> = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

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
                    <CardHeader title='Login Page' />
                        <CardContent>
                            <Tabs
                                indicatorColor="primary"
                                textColor="primary">
                                <Tab label="Login" />
                                <Link href='/signup'><Tab label="Sign Up" /></Link>
                            </Tabs>
                            <TextField label="User Name"></TextField>
                            <TextField label="Password"></TextField>
                            <Button onClick={()=>{printData(userName, password)}}>Submit</Button>
                            <Link href='/'> Forgot password?</Link> 
                        </CardContent>
                </Card>
            </Paper>
        </div>
    );
}