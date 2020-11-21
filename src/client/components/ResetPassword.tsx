import React, { useState } from "react";
import { Button, Tabs, Tab , TextField, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const onTextFieldUpdate = (toUpdate : React.Dispatch<React.SetStateAction<string>>) => {
    return (e : React.ChangeEvent<HTMLInputElement>) => {
        toUpdate(e.target.value);
    };
}

export const ResetPassword: React.FunctionComponent = () => {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const areSame = (confirmed: string, regular: string) => {
        return confirmed == regular || confirmed === "";
    }
    
      const properPassword = () => {
        return ((newPassword.length > 9 && newPassword.length < 255) || newPassword.length == 0); 
    }

    // Create a reset password with token mutation, that returns an email that confirms the password has been changed
    
    return(
        <div>
            <Paper style={{
                maxWidth: "500px",
                margin: "auto"
            }}>
                <Grid container direction="column" alignContent="center" alignItems="center" spacing={1}>
                    <Grid xs={12} item>
                        <Tabs indicatorColor="primary" textColor="primary" variant="fullWidth" value={0}>
                            <Tab label="Reset Password" />
                        </Tabs>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Enter New Password" onChange={onTextFieldUpdate(setNewPassword)} helperText={!properPassword() ? 'Password must be between 9 and 255 characters' : ''} error={!properPassword()} type="password"></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Confirm Password" onChange={onTextFieldUpdate(setConfirmPassword)} helperText={!areSame(newPassword, confirmPassword) ? 'Passwords do not match' : ''} error={!areSame(newPassword, confirmPassword)} type="password"></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <Button variant="contained">
                            Update Password
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};