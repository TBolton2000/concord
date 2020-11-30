import React, { useState } from "react";
import { makeStyles, TextField, Button, Paper, Tab, Tabs, Link, Grid } from "@material-ui/core";
import { createStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from "react-router-dom";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "./accessToken";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        margin: "10px",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    textField: {
        width: '100%',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        margin: "auto", 
        outline: "none", 
        padding: "15px",
        display: 'flex',
        minWidth: "500px",
        maxWidth: "800px",
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
        <Grid container className={classes.root}>
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
                        <Link href='/forgotpassword'> 
                            Forgot password?
                        </Link> 
                    </Grid>
                </Grid>
            </Paper> 
        </Grid>
    );
}