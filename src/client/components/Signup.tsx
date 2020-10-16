import React, { useState } from "react";
import { Card, TextField, Button, CardContent } from "@material-ui/core";

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
    const [email, setEmail] = useState("");

    const printData = (...args) => {
        for(let arg of args)
        {
            console.log(arg);
        }
    }

    return(
        <div>
            <h3>SignUp</h3>
            
            <Card>
                <CardContent>
                    <TextField label="User Name" onChange={onTextFieldUpdate(setUserName)}></TextField>
                    <Button onClick={()=>{printData(name, userName, password, email)}}>
                        Test
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}