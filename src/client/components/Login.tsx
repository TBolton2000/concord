import React, { useState } from "react";
import { TextField, Button, Paper, Tab, Tabs, Link, Grid } from "@material-ui/core";

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
            <Paper style={{
                maxWidth: "500px",
                margin: "auto"
            }}>
                <Grid container direction="column" alignContent="center" alignItems="center" spacing={1}>
                    <Grid xs={12} item>
                        <Tabs indicatorColor="primary" textColor="primary" variant="fullWidth" value={0}>
                            <Tab label="Login" />
                            <Tab label="Sign Up" href="/signup"/>
                        </Tabs>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Username" autoFocus fullWidth onChange={onTextFieldUpdate(setUserName)}></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Password" autoFocus fullWidth onChange={onTextFieldUpdate(setPassword)}></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <Button variant="contained" onClick={()=>{printData(userName, password)}}>
                            Login
                        </Button>
                    </Grid>
                    <Grid xs={12} item>
                        <Link href='/'> 
                            Forgot password?
                        </Link> 
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}