import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Grid, Paper, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
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
      toUpdate(e.target.value);
  };
}



interface Props{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    inputValues: any;
}

export const TransitionsModal: React.FC<Props> = ({open, setOpen, inputValues}) =>{
  const [EventTitle, setEventTitle] = useState("");
  const [StartDate, setStartDate] = useState(inputValues[0]);
  const [StartTime, setStartTime] = useState(inputValues[1]);
  const [EndDate, setEndDate] = useState(inputValues[2]);
  const [EndTime, setEndTime] = useState(inputValues[3]);
  const [Problem, setProblem] = useState("");
  const [Language, setLanguage] = useState("");
  const [Interviewers, setInterviewers] = useState("");
  const [Candidates, setCandidates] = useState("");

  const classes = useStyles();
  
  useEffect(() => { 
    // console.log("component updated");
    setStartDate(inputValues[0]); 
    setStartTime(inputValues[1]); 
    setEndDate(inputValues[2]); 
    setEndTime(inputValues[3]); 
  }, [inputValues]);
  
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const printData = (...args) => {
    for(let arg of args)
    {
        console.log(arg);
    }
  }

  const onsubmit = (formRef) => {
    printData(inputValues,EventTitle,StartDate,StartTime,EndDate,EndTime,Problem,Language,Interviewers,Candidates);
    if(formRef.current.reportValidity()){
      handleClose();
    }
    else{
      return formRef.current.reportValidity();
    }
  }

  // console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(inputValues[0]));
  // console.log(new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(inputValues[0]));
  
  const formRef = React.useRef(null);

  return (
    <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3 id="transition-modal-title">Create/Edit Event</h3>
            {/* <p id="transition-modal-description">TEXT</p> */}
            <Paper style={{
                minWidth: "335px",
                maxWidth: "700px",
                margin: "auto"
            }}>
              <form ref={formRef}>
                <Grid container direction="row" justify="center" style={{maxWidth: '100%'}} spacing={2}>
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
                        <TextField required value={StartDate || ""} helperText="Start Date" type="date" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setStartDate)}/>
                    </Grid>
                    <Grid xs={4} item style={{textAlign: "center"}}>
                        <TextField required value={StartTime || ""} helperText="Start Time" type="time" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setStartTime)}/>
                    </Grid>
                    <Grid xs={4} item style={{textAlign: "center"}}>
                        <TextField required label="Problem" onChange={onTextFieldUpdate(setProblem)}/>
                    </Grid>
                    <Grid xs={4} item style={{textAlign: "center"}}>
                        <TextField required value={EndDate || ""} helperText="End Date" type="date" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setEndDate)}/>
                    </Grid>
                    <Grid xs={4} item style={{textAlign: "center"}}>
                        <TextField required value={EndTime || ""} helperText="End Time" type="time" InputLabelProps={{ shrink: true }} onChange={onTextFieldUpdate(setEndTime)}/>
                    </Grid>
                    <Grid xs={4} item style={{textAlign: "center"}}>
                        <TextField required label="Language" onChange={onTextFieldUpdate(setLanguage)}/>
                    </Grid>
                  </Grid>
                  <Grid container direction="column" alignContent="center" spacing={1}>
                      <Grid xs={4} item style={{padding: 10}}>
                          <Button variant="contained" onClick={()=>{onsubmit(formRef)}}>
                              Update
                          </Button>
                      </Grid>
                  </Grid>
                </form>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}