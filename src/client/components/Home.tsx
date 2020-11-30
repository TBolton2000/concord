import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container/Container';

import { makeStyles } from '@material-ui/core';

import { Cards } from './cards';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/user/akmyscich/likes/)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },


  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    align: "center",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
}));

export const Home: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>

      <React.Fragment>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Concord: Interviewing Simplified
                </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>

            </Typography>
            <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
              Our Mission
                </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Concord is a tool to bring teams together as a catalyst for interviewers to see, foster, and inspire a tighter community of employees.
                </Typography>
            <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
              Our Essence
                </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              At our core, Concord operates on imagination, individaulity, inclusivity, and impact.
                </Typography>
            <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
              Our Promise
                </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              We deliver optimistic and diverse team building, experiences, and persepctives to quality candidates and job seekers.
                </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Cards
              title='Albin "Kyle" Myscich'
              greeting="Howdy!"
              image='../../assets/images/Kyle.jpg'
              description="
                  I'm an undergraduate student pursuing a 
                  double major in Computer Science and 
                  Electrical Engineering with two minors in 
                  Mathematics and Cybersecurity at Texas A&M 
                  University (graduating in the Spring of 2022). 
                  I have a history of working for Hewlett Packard 
                  Inc. among several startups specializing in 
                  software engineering and machine learning. I 
                  joined the Hardware Security lab in the Summer 
                  of 2020 as an undergraduate researcher. My 
                  research interests involve hardware security, 
                  data science, and network security."
              github="https://github.com/AMyscich"
              email="mailto:AMyscich@tamu.edu?subject=Howdy!"
            />

            <Cards
              title='Trevor Bolton'
              greeting="Greetings!"
              image="../../assets/images/Trevor.jpg"
              description=""
              github="https://github.com/TBolton2000"
              email="mailto:tbolton2000@tamu.edu?subject=Howdy!"
            />

            <Cards
              title='Mahmood "Shilleh"'
              greeting="Hello!"
              image="../../assets/images/Shilleh.jpg"
              description="
                  My name is Mahmood Shilleh, a.k.a Shilleh, I am a Graduate
                  Student at Texas A&M in Computer Science. I received my
                  undergraduate degree in Mechanical Engineering from the
                  University at Buffalo. My interests include coding,
                  playing piano, exercising, and cooking Middle Eastern food."
              github="https://github.com/coachshilleh"
              email="mailto:mahmoods@tamu.edu?subject=Howdy!"
            />

            <Cards
              title='Qusai Amer'
              greeting="What's up!"
              image="../../assets/images/Qusai.png"
              description="
                  I am from Sana'a, Yemen.
                  I'm currently pursuing a  master's degree in Computer
                  Science at Texas A&M University. I did my bachelor's in
                  Chemical Engineering also at TAMU. In my free time, I enjoy
                  reading about history and playing soccer."
              github="https://github.com/Qusaiamer"
              email="mailto:qusai3mer@tamu.edu?subject=Howdy!"
            />

            <Cards
              title='Peiman Mohseni'
              greeting="Hi There!"
              image="../../assets/images/Peiman.jpeg"
              description="
                  I am currently a Ph.D student of computer science in Texas A&M 
                  University. Prior to that, I was a bachelor student at the 
                  department of electrical engineering in University of Tehran. 
                  I am mainly interested in theoretical machine learning and 
                  mathematics. My hobbies include painting, photography and 
                  listening to music."
              github="https://github.com/peiman95"
              email="mailto:peiman.mohseni@tamu.edu?subject=Howdy!"
            />

            <Cards
              title='Gowtham Batchala'
              greeting="Hi!"
              image="../../assets/images/Default.jpg"
              description="
                  ..."
              github="https://github.com/Gowtham153"
              email="mailto:gowtham153@tamu.edu?subject=Howdy!"
            />

          </Grid>
        </Container>

        <footer className={classes.footer}>
          <div>
          <Typography variant="h6" align="center" gutterBottom>
            Where Can I Visit?
          </Typography>
            <a href="https://goo.gl/maps/QscrFkBfxKYvynUu9" target="_blank">
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                  Blocker Bldg
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                  College Station, TX 77840
                </Typography>
            </a>
          </div>
          <div>
            <Typography variant="h6" align="center" gutterBottom>
              Call us at:
            <a href="tel:9798455851">
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                  (979) 845-5851
                </Typography>
            </a>
            </Typography>
          </div>
        </footer>

      </React.Fragment>
    </div>
  );
}