import React, { useState } from "react";
import { TextField, Button, Paper, Tab, Tabs, Link, Grid } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "./accessToken";

const onTextFieldUpdate = (toUpdate : React.Dispatch<React.SetStateAction<string>>) => {
    return (e : React.ChangeEvent<HTMLInputElement>) => {
        toUpdate(e.target.value);
    };
}

export const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useLoginMutation()

    const printData = (...args) => {
        for(let arg of args)
        {
            console.log(arg);
        }
    }

    const submitForm = async () => {
        const response = await login({
            variables: {
                email,
                password
            },
            update: (store, {data}) => {
                if (!data) {
                    return null;
                }
                store.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        me: data.login.user
                    }
                })
            }
        })

        if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
            history.push("/");
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
                        <TextField label="Email" autoFocus value={email} onChange={onTextFieldUpdate(setEmail)}></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Password" value={password} onChange={onTextFieldUpdate(setPassword)} type="password"></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <Button variant="contained" onClick={submitForm}>
                            Login
                        </Button>
                    </Grid>
                    <Grid xs={12} item>
                        <Link href='/forgotpassword'> 
                            Forgot password?
                        </Link> 
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}