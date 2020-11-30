import React, { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, DialogContentText, Grid, Paper, TextField } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';


const MySwal = withReactContent(Swal)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: "10px",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        },
        title: {
            margin: "10px" 
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            margin: "auto", 
            outline: "none", 
            padding: "15px",
        },
        generalInput:{
            textAlign: "center",
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
        submit: {
            margin: 8, 
            padding: 10
        },
        comment: {
            display: 'flex', 
            flexWrap: 'wrap'
        },
        confirm: {
            textAlign: "center"
        },
    }),
);

const onTextFieldUpdate = (toUpdate: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        toUpdate(e.target.value);
    };
}

const resetTextField = (toUpdate: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = '';
        toUpdate(e.target.value);
    };
}

export const ContactUs: React.FC<RouteComponentProps> = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");

    const printData = (...args) => {
        for (let arg of args) {
            console.log(arg);
        }
    }

    const onSubmit = (formRef) => {
        // printData(firstName, lastName, phone, email, comment);
        if (formRef.current.reportValidity()) {
            
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: "We'll get back to you soon",
            });

            setFirstName("");
            setLastName("");
            setPhone("");
            setEmail("");
            setComment("");
            
        }
        else {
            return formRef.current.reportValidity();
        }
    }

    const classes = useStyles();
    const formRef = React.useRef(null);

    return (
        <Grid container className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.title}>
                <h2>Contact Us</h2>
                <DialogContentText>Let us know how we're doing</DialogContentText>
                </div>
                <form id="contactForm" ref={formRef}>
                    <Grid container direction="row" justify="space-evenly" alignContent="center" spacing={2}>
                        <Grid spacing={2}>
                            <Grid xs item>
                                <TextField required label="First Name" className={classes.generalInput} onChange={onTextFieldUpdate(setFirstName)} value={firstName} />
                            </Grid>
                            <Grid xs item>
                                <TextField required label="Email" helperText="We won't share your email" className={classes.generalInput} onChange={onTextFieldUpdate(setEmail)} value={email} />
                            </Grid>
                        </Grid> 
                        <Grid spacing={2}>
                            <Grid xs item>
                                <TextField required label="Last Name" className={classes.generalInput} onChange={onTextFieldUpdate(setLastName)} value={lastName}/>
                            </Grid>
                            <Grid xs item>
                                <TextField required label="Phone" className={classes.generalInput} onChange={onTextFieldUpdate(setPhone)} value={phone}/>
                            </Grid>
                        </Grid> 
                        <Grid xs={10} className={classes.submit} item>
                            <TextField required multiline rows={6} className={classes.comment} label="What's on Your Mind?" onChange={onTextFieldUpdate(setComment)} value={comment}/>
                        </Grid>   
                    </Grid>
                    <Grid container direction="column" alignContent="center" spacing={1}>
                        <Grid className={classes.submit} item>
                            <Button variant="contained" onClick={() => { onSubmit(formRef) }}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
}