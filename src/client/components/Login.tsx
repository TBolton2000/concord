import React, { useState } from "react";
import { Card, TextField, Button, CardContent } from "@material-ui/core";

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
            <h3>Login</h3>
            <Card>
                <CardContent>
                    <TextField label="User Name" onChange={onTextFieldUpdate(setUserName)}></TextField>
                    <Button onClick={()=>{printData(userName, password)}}>
                        Test
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}