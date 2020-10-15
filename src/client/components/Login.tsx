import React, { useState } from "react";
import { Card, TextField, Button, CardContent, Paper, Tab, Tabs, Link, CardHeader } from "@material-ui/core";

import { RouterExample } from "./RouterExample";
import { SignUp } from "./Signup";

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
                            <CardHeader title='Welcome Back!' />
                            <CardContent>
                                <Tabs
                                    value={userName}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={onTextFieldUpdate(setUserName)}>
                                    <Tab label="Login" />
                                    <Link href='/signup'><Tab label="Sign Up" /></Link>
                                </Tabs>
                            </CardContent>
                            <CardContent><TextField label="User Name" onChange={onTextFieldUpdate(setUserName)}></TextField></CardContent>
                            <CardContent><TextField label="Password" onChange={onTextFieldUpdate(setPassword)}></TextField></CardContent>
                            <CardContent>
                                <Button onClick={()=>{printData(userName, password)}}>
                                Submit
                                </Button>
                            </CardContent>
                            {/* <CardContent> "Forgot password?" component={Link} to={/components/} </CardContent> */}
                            <CardContent > <Link href='/'> Forgot password?</Link> </CardContent>

                    </Card>
            </Paper>

        </div>
    );
}