import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Grid, IconButton, Paper, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',

        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),

        },
        root: {
            '& > svg': {
                margin: theme.spacing(2),
            },
        },
    }),
);

const onTextFieldUpdate = (toUpdate: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        toUpdate(e.target.value);
    };
}

interface eventProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    startDateRef: string;
    startTimeRef: string;
    endDateRef: string;
    endTimeRef: string;
}

export const EventsModal: React.FC<eventProps> = ({ open, setOpen, startDateRef, startTimeRef, endDateRef, endTimeRef }) => {
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

    const handleClose = () => {
        setOpen(false);
    };

    const printData = (...args) => {
        for (let arg of args) {
            console.log(arg);
        }
    }

    const onSubmit = (formRef) => {
        printData([startDateRef, startTimeRef, endDateRef, endTimeRef], eventTitle, startDate, startTime, endDate, endTime, problem, language, interviewers, candidates);
        if (formRef.current.reportValidity()) {
            handleClose();
        }
        else {
            return formRef.current.reportValidity();
        }
    }

    const formRef = React.useRef(null);

    return (
        <Modal
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
                <Paper style={{ minWidth: "335px", maxWidth: "700px", margin: "auto", outline: "none", padding: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 style={{ margin: "10px" }}>Create/Edit Event</h3>
                        <IconButton color="secondary" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <form ref={formRef}>
                        <Grid container direction="row" justify="center" style={{ maxWidth: '100%' }} spacing={2}>
                            <Grid xs={4} item style={{ textAlign: "center" }}>
                                <TextField required label="Event Title" onChange={onTextFieldUpdate(setEventTitle)} />
                            </Grid>
                            <Grid xs={4} item style={{ textAlign: "center" }}>
                                <TextField required label="Interviewers" onChange={onTextFieldUpdate(setInterviewers)} />
                            </Grid>
                            <Grid xs={4} item style={{ textAlign: "center" }}>
                                <TextField required label="Candidates" onChange={onTextFieldUpdate(setCandidates)} />
                            </Grid>
                            <Grid xs={4} item style={{ textAlign: "center" }}>
                                <TextField required value={startDate || ""} helperText="Start Date" type="date" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setStartDate)} />
                            </Grid>
                            <Grid xs={4} item style={{ textAlign: "center" }}>
                                <TextField required value={startTime || ""} helperText="Start Time" type="time" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setStartTime)} />
                            </Grid>
                            <Grid xs={4} item style={{ textAlign: "center" }}>
                                <TextField required label="Problem" onChange={onTextFieldUpdate(setProblem)} />
                            </Grid>
                            <Grid xs={4} item style={{ textAlign: "center" }}>
                                <TextField required value={endDate || ""} helperText="End Date" type="date" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setEndDate)} />
                            </Grid>
                            <Grid xs={4} item style={{ textAlign: "center" }}>
                                <TextField required value={endTime || ""} helperText="End Time" type="time" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setEndTime)} />
                            </Grid>
                            <Grid xs={4} item style={{ textAlign: "center" }}>
                                <TextField required label="Language" onChange={onTextFieldUpdate(setLanguage)} />
                            </Grid>
                        </Grid>
                        <Grid container direction="column" alignContent="center" spacing={1}>
                            <Grid xs={4} item style={{ padding: 10 }}>
                                <Button variant="contained" onClick={() => { onSubmit(formRef) }}>
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