import React, { useState } from "react";
import { makeStyles, CardHeader, Button, Tabs, Tab , TextField, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import crypto from "crypto";
import async from "async";
import { User } from "../services/template/entity/user";
import nodemailer from "nodemailer";


const onTextFieldUpdate = (toUpdate : React.Dispatch<React.SetStateAction<string>>) => {
    return (e : React.ChangeEvent<HTMLInputElement>) => {
        toUpdate(e.target.value);
    };
}

export const ForgotPassword: React.FunctionComponent = () => {

    const [email, setEmail] = useState("");

    const resetPassword = async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          User.findOne({ email: email }, function(err, user) {
            if (!user) {
              // req.flash('error', 'No account with that email address exists.');
              console.log('none');
              return false;
            }
    
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token, user, done) {
          var smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: 'learntocodeinfo@gmail.com',
              pass: process.env.GMAILPW
            }
          });
          var mailOptions = {
            to: user.email,
            from: 'learntocodeinfo@gmail.com',
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            console.log('mail sent');
            req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            done(err, 'done');
          });
        }
      ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
      });
    });
    

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
                </Grid>
            </Paper>
        </div>
);
};