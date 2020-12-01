import React, { useState } from 'react';
import { makeStyles, TextField, Button, Paper, Link, Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container/Container';
import { Cards } from './cards';
import { RouteComponentProps } from "react-router-dom";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "./accessToken";

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
    background: "#4C96D7",
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

const onTextFieldUpdate = (toUpdate : React.Dispatch<React.SetStateAction<string>>) => {
  return (e : React.ChangeEvent<HTMLInputElement>) => {
      toUpdate(e.target.value);
  };
}

export const Home: React.FC<RouteComponentProps> = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const classes = useStyles();

  const submitForm = async () => {
    try {
    const response = await login({
      variables: {
          email,
          password
      },
      update: (store, {data}) => {
          if (!data) {
              return null;
          }
          store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                  me: data.login.user
              }
          })
      }
    })
    console.log(response);
    if (response && response.data) {
        setAccessToken(response.data.login.accessToken);
        history.push("/dashboard-upper");
    }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
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
            <div className="form">
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
                value={email}
                onChange={onTextFieldUpdate(setEmail)}
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
                value={password}
                onChange={onTextFieldUpdate(setPassword)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={submitForm}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
          </div>
          </div>
        </Grid>
      </Grid>

      <React.Fragment>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Concord: Interviewing Simplified
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
              linkedin="https://www.linkedin.com/in/albin-kyle-myscich-a1b495b4/"
              email="mailto:AMyscich@tamu.edu?subject=Howdy!"
            />

            <Cards
              title='Trevor Bolton'
              greeting="Greetings!"
              image="../../assets/images/Trevor.jpg"
              description="
              I am a senior undergraduate student in Computer Science 
              at Texas A&M graduating in May 2021. I will continue on 
              Masters in Computer Science as part of the Honors Fast Track 
              Program. I enjoy building new software projects and learning 
              new skills!"
              github="https://github.com/TBolton2000"
              linkedin="https://www.linkedin.com/in/trevor-bolton-428158192/"
              email="mailto:tbolton2000@tamu.edu?subject=Howdy!"
            />

            <Cards
              title='Mahmood "Shilleh"'
              greeting="Hello!"
              image="../../assets/images/Shilleh.jpg"
              description="
                  I am a Graduate
                  Student at Texas A&M in Computer Science. I received my
                  undergraduate degree in Mechanical Engineering from the
                  University at Buffalo. My interests include coding,
                  playing piano, exercising, and cooking Middle Eastern food."
              github="https://github.com/coachshilleh"
              linkedin="https://www.linkedin.com/in/mahmood-shilleh-0385bb133/"
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
              linkedin="https://www.linkedin.com/in/qusai-amer-267909127/"
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
              linkedin="https://www.linkedin.com/in/peiman-mohseni-4005521a4/"
              email="mailto:peiman.mohseni@tamu.edu?subject=Howdy!"
            />

            <Cards
              title='Gowtham Batchala'
              greeting="Hi!"
              image="../../assets/images/Gowtham.jpg"
              description="
              I am a Masters graduate student in Electrical Engineering at 
              Texas A&M University. Did my Batchelor's in Engineering Physics 
              dept from Indian Institute of Technology Bombay. My areas of 
              Interest: Computer vision, AI, Reinforced Learning. My hobbies 
              are watching anime, playing badminton."
              github="https://github.com/Gowtham153"
              linkedin="https://www.linkedin.com/in/gowtham-batchala-a50948b2/"
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
              Call Us At:
            <a href="tel:9798455851">
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                  (979) 845-5851
                </Typography>
            </a>
            </Typography>
          </div>
          <div>
            <Typography variant="h6" align="center" gutterBottom>
              Email Us At Our
            <a href="/contact-us">
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                  Contact Form
                </Typography>
            </a>
            </Typography>
          </div>
        </footer>

      </React.Fragment>
    </>
  );
}