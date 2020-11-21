import React, { useState } from "react";
import { Button, Tabs, Tab , TextField, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useResetPasswordTokenMutation } from '../generated/graphql';

const onTextFieldUpdate = (toUpdate : React.Dispatch<React.SetStateAction<string>>) => {
    return (e : React.ChangeEvent<HTMLInputElement>) => {
        toUpdate(e.target.value);
    };
}

export const ForgotPassword: React.FunctionComponent = () => {

    const [email, setEmail] = useState("");
    const [resetPasswordToken] = useResetPasswordTokenMutation();

    const resetToken = async (email) => {
      resetPasswordToken({variables: {email}})
      console.log('passed');
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
                            <Tab label="Forgot Password" />
                        </Tabs>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Enter Account Email" value={email} onChange={onTextFieldUpdate(setEmail)} type="email"></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <Button variant="contained" href="/forgotpassword" onClick={() => resetToken(email)}>
                            Send Email
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};