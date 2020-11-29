import React, { useState } from "react";
import { makeStyles, TextField, Button, Paper, Tab, Tabs, Link, Grid } from "@material-ui/core";
import { createStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from "react-router-dom";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "./accessToken";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
        width: '100%',
    },
    paper: {
        display: 'flex',
        minWidth: "500px",
        maxWidth: "800px",
        margin: "auto",
        padding: "10px"
    }
  }),
);

const onTextFieldUpdate = (toUpdate : React.Dispatch<React.SetStateAction<string>>) => {
    return (e : React.ChangeEvent<HTMLInputElement>) => {
        toUpdate(e.target.value);
    };
}

export const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useLoginMutation();
    const classes = useStyles({});

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
        <Paper className={classes.paper}>
            <Grid container direction="column" alignContent="center" alignItems="center" spacing={1}>
                <Grid xs={12} item>
                    <Tabs indicatorColor="primary" textColor="primary" variant="fullWidth" value={0}>
                        <Tab label="Login" />
                        <Tab label="Sign Up" href="/signup"/>
                    </Tabs>
                </Grid>
                <Grid xs={12} item>
                    <TextField label="Email" autoFocus value={email} className={classes.textField} onChange={onTextFieldUpdate(setEmail)}></TextField>
                </Grid>
                <Grid xs={12} item>
                    <TextField label="Password" value={password} className={classes.textField} onChange={onTextFieldUpdate(setPassword)} type="password"></TextField>
                </Grid>
                <Grid xs={12} item>
                    <Button variant="contained" onClick={submitForm}>
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
    );
}