import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Grid, Paper, Tab, Tabs, TextField } from '@material-ui/core';

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

interface Props{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TransitionsModal: React.FC<Props> = ({open, setOpen}) =>{
  const classes = useStyles();
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <h3 id="transition-modal-title">Create/Edit Modal</h3>
            <p id="transition-modal-description">TEXT</p>
            <Paper style={{
                minWidth: "500px",
                maxWidth: "800px",
                margin: "auto"
            }}>
                <Grid container direction="column" alignContent="center" spacing={1}>
                    <Grid xs={12} item>
                        <TextField label="Event Title"/>
                    </Grid>
                    <Grid xs={12} color="#757575" item>
                        Date
                    </Grid>
                    <Grid xs={12} item>
                        <TextField type="date"/>
                    </Grid>
                    <Grid xs={12} color="#757575" item>
                        Time
                    </Grid>
                    <Grid xs={12} item>
                        <TextField type="time"/>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="problem"/>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Language"/>
                    </Grid>
                    <Grid xs={12} item >
                        <TextField label="Interviewers"/>
                    </Grid>
                    <Grid xs={12} item >
                        <TextField label="Candidates"/>
                    </Grid>
                </Grid>
                <Grid container direction="column" alignContent="center" spacing={1}>
                    <Grid xs={12} item>
                        <Button variant="contained">
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}