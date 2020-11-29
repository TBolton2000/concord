import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
<<<<<<< HEAD
import { Button, Grid, IconButton, Paper, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
=======
import { Button, Grid, Paper, TextField } from '@material-ui/core';
>>>>>>> 99cb69cf021d0e746233d99bc6b21237c6b0c1ff

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
<<<<<<< HEAD
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none'
        },
        paper: {
            minWidth: "335px", 
            maxWidth: "700px", 
            margin: "auto", 
            outline: "none", 
            padding: "15px"
        },
        header:{
            display: "flex", 
            justifyContent: "space-between"
        },
        title: {
            margin: "10px" 
        },
        generalInput:{
            textAlign: "center",
            padding: theme.spacing(2),
            color: theme.palette.text.secondary
        },
        update: {
            margin: 10
        }
    }),
);

const onTextFieldUpdate = (toUpdate: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
=======
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        },
        paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        },
    }),
);

const onTextFieldUpdate = (toUpdate : React.Dispatch<React.SetStateAction<string>>) => {
    return (e : React.ChangeEvent<HTMLInputElement>) => {
>>>>>>> 99cb69cf021d0e746233d99bc6b21237c6b0c1ff
        toUpdate(e.target.value);
    };
}

<<<<<<< HEAD
interface eventProps {
=======
interface eventProps{
>>>>>>> 99cb69cf021d0e746233d99bc6b21237c6b0c1ff
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    startDateRef: string;
    startTimeRef: string;
    endDateRef: string;
    endTimeRef: string;
}

<<<<<<< HEAD
export const EventsModal: React.FC<eventProps> = ({ open, setOpen, startDateRef, startTimeRef, endDateRef, endTimeRef }) => {
=======
export const EventsModal: React.FC<eventProps> = ({open, setOpen, startDateRef, startTimeRef, endDateRef, endTimeRef}) => {
>>>>>>> 99cb69cf021d0e746233d99bc6b21237c6b0c1ff
    const [eventTitle, setEventTitle] = useState("");
    const [startDate, setStartDate] = useState(startDateRef);
    const [startTime, setStartTime] = useState(startTimeRef);
    const [endDate, setEndDate] = useState(endDateRef);
    const [endTime, setEndTime] = useState(endTimeRef);
    const [problem, setProblem] = useState("");
    const [language, setLanguage] = useState("");
    const [interviewers, setInterviewers] = useState("");
    const [candidates, setCandidates] = useState("");

    const classes = useStyles();
<<<<<<< HEAD

    useEffect(() => {
        // console.log("component updated");
        setStartDate(startDateRef);
        setStartTime(startTimeRef);
        setEndDate(endDateRef);
        setEndTime(endTimeRef);
    }, [startDateRef, startTimeRef, endDateRef, endTimeRef]);

    // const handleOpen = () => {
    //   setOpen(true);
    // };

=======
    
    useEffect(() => { 
        // console.log("component updated");
        setStartDate(startDateRef); 
        setStartTime(startTimeRef); 
        setEndDate(endDateRef); 
        setEndTime(endTimeRef); 
    }, [startDateRef, startTimeRef, endDateRef, endTimeRef]);

>>>>>>> 99cb69cf021d0e746233d99bc6b21237c6b0c1ff
    const handleClose = () => {
        setOpen(false);
    };

    const printData = (...args) => {
<<<<<<< HEAD
        for (let arg of args) {
=======
        for(let arg of args)
        {
>>>>>>> 99cb69cf021d0e746233d99bc6b21237c6b0c1ff
            console.log(arg);
        }
    }

    const onSubmit = (formRef) => {
<<<<<<< HEAD
        printData([startDateRef, startTimeRef, endDateRef, endTimeRef], eventTitle, startDate, startTime, endDate, endTime, problem, language, interviewers, candidates);
        if (formRef.current.reportValidity()) {
            handleClose();
        }
        else {
            return formRef.current.reportValidity();
        } 
=======
        printData([startDateRef, startTimeRef, endDateRef, endTimeRef],eventTitle,startDate,startTime,endDate,endTime,problem,language,interviewers,candidates);
        if(formRef.current.reportValidity()){
            handleClose();
        }
        else{
            return formRef.current.reportValidity();
        }
>>>>>>> 99cb69cf021d0e746233d99bc6b21237c6b0c1ff
    }

    const formRef = React.useRef(null);

    return (
        <Modal
<<<<<<< HEAD
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500, }}
        >
            <Fade in={open}>
                <Paper className={classes.paper}>
                    <div className={classes.header}>
                        <h3 className={classes.title}>Create/Edit Event</h3>
                        <IconButton color="secondary" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <form ref={formRef}>
                        <Grid container direction="row" justify="center" style={{ maxWidth: '100%' }} spacing={2}>
                            <Grid xs={4} className={classes.generalInput} item>
                                <TextField required label="Event Title" onChange={onTextFieldUpdate(setEventTitle)} />
                            </Grid>
                            <Grid xs={4} className={classes.generalInput} item>
                                <TextField required label="Interviewers" onChange={onTextFieldUpdate(setInterviewers)} />
                            </Grid>
                            <Grid xs={4} className={classes.generalInput} item>
                                <TextField required label="Candidates" onChange={onTextFieldUpdate(setCandidates)} />
                            </Grid>
                            <Grid xs={4} className={classes.generalInput} item>
                                <TextField required value={startDate || ""} helperText="Start Date" type="date" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setStartDate)} />
                            </Grid>
                            <Grid xs={4} className={classes.generalInput} item>
                                <TextField required value={startTime || ""} helperText="Start Time" type="time" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setStartTime)} />
                            </Grid>
                            <Grid xs={4} className={classes.generalInput} item>
                                <TextField required label="Problem" onChange={onTextFieldUpdate(setProblem)} />
                            </Grid>
                            <Grid xs={4} className={classes.generalInput} item>
                                <TextField required value={endDate || ""} helperText="End Date" type="date" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setEndDate)} />
                            </Grid>
                            <Grid xs={4} className={classes.generalInput} item>
                                <TextField required value={endTime || ""} helperText="End Time" type="time" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setEndTime)} />
                            </Grid>
                            <Grid xs={4} className={classes.generalInput} item>
                                <TextField required label="Language" onChange={onTextFieldUpdate(setLanguage)} />
                            </Grid>
                        </Grid>
                        <Grid container direction="column" alignContent="center" spacing={1}>
                            <Grid xs={4} className={classes.update} item>
                                <Button variant="contained" onClick={() => { onSubmit(formRef) }}>
=======
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500,}}
        >
            <Fade in={open}>
                <Paper style={{minWidth:"335px", maxWidth:"700px", margin:"auto", outline: "none"}}>
                    <form ref={formRef}>
                    <Grid container direction="row" justify="center" alignContent="center" alignItems="center" style={{width: '100%'}} spacing={2}>
                            <Grid xs={11} item>
                                <h3 id="transition-modal-title">Create/Edit Event</h3>
                            </Grid>
                            <Grid xs={4} item style={{textAlign: "center"}}>
                                <TextField required label="Event Title" onChange={onTextFieldUpdate(setEventTitle)}/>
                            </Grid>
                            <Grid xs={4} item style={{textAlign: "center"}}>
                                <TextField required label="Interviewers" onChange={onTextFieldUpdate(setInterviewers)}/>
                            </Grid>
                            <Grid xs={4} item style={{textAlign: "center"}}>
                                <TextField required label="Candidates" onChange={onTextFieldUpdate(setCandidates)}/>
                            </Grid>
                            <Grid xs={4} item style={{textAlign: "center"}}>
                                <TextField required value={startDate || ""} helperText="Start Date" type="date" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setStartDate)}/>
                            </Grid>
                            <Grid xs={4} item style={{textAlign: "center"}}>
                                <TextField required value={startTime || ""} helperText="Start Time" type="time" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setStartTime)}/>
                            </Grid>
                            <Grid xs={4} item style={{textAlign: "center"}}>
                                <TextField required label="Problem" onChange={onTextFieldUpdate(setProblem)}/>
                            </Grid>
                            <Grid xs={4} item style={{textAlign: "center"}}>
                                <TextField required value={endDate || ""} helperText="End Date" type="date" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setEndDate)}/>
                            </Grid>
                            <Grid xs={4} item style={{textAlign: "center"}}>
                                <TextField required value={endTime || ""} helperText="End Time" type="time" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setEndTime)}/>
                            </Grid>
                            <Grid xs={4} item style={{textAlign: "center"}}>
                                <TextField required label="Language" onChange={onTextFieldUpdate(setLanguage)}/>
                            </Grid>
                            <Grid xs={12} item style={{textAlign: "center", margin: 10}}>
                                <Button variant="contained" onClick={()=>{onSubmit(formRef)}}>
>>>>>>> 99cb69cf021d0e746233d99bc6b21237c6b0c1ff
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Fade>
        </Modal>
    );
}