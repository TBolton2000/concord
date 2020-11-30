import React, { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, DialogContentText, Grid, Paper, TextField } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { useContactUsMutation} from '../generated/graphql';


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
    const [contactUs] = useContactUsMutation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");

    const printData = (...args) => {
        for (let arg of args) {
            console.log(arg);
        }
    }

    const onSubmit = async (formRef) => {
        // printData(firstName, lastName, phone, email, comment);
        let allInputsFilled = formRef.current.reportValidity();
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if(!regexp.test(email))
            allInputsFilled = false;
      
        Swal.fire({
            icon: allInputsFilled ? 'success' : 'error',
            title: allInputsFilled ? 'Success!' : 'Oops...',
            text: allInputsFilled ? "We'll get back to you soon." : "We cannot accept the current fields in the form. Please review all entries and verify they're correctly entered.",
        });

        if (allInputsFilled) {

            const success = await contactUs({variables: {firstName, lastName, phoneNumber, email, comment}});
            
            setFirstName("");
            setLastName("");
            setPhone("");
            setEmail("");
            setComment("");
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
                                <TextField required label="Phone" className={classes.generalInput} onChange={onTextFieldUpdate(setPhone)} value={phoneNumber}/>
                            </Grid>
                        </Grid> 
                        <Grid xs={10} className={classes.submit} item>
                            <TextField required multiline rows={6} className={classes.comment} label="What's on Your Mind?" onChange={onTextFieldUpdate(setComment)} value={comment}/>
                        </Grid>   
                    </Grid>
                    <Grid container direction="column" alignContent="center" spacing={1}>
                        <Grid className={classes.submit} item>
                            <Button variant="contained" onClick={() => onSubmit(formRef) }>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
}