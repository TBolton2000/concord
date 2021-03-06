import { CssBaseline, makeStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // Pages
import { Header } from './components/Header';
import { SideMenu } from './components/SideMenu';
import { Home } from './components/Home';
import { StyledComponentsExample } from './components/StyledComponentsExample';
import { UsersList } from './components/UsersList';
import { SignUp } from './components/Signup';
import { ForgotPassword } from './components/ForgotPassword';
import { ResetPassword } from './components/ResetPassword';
import { ContactUs } from './components/ContactUs';
import { DashboardCalendar } from './components/DashboardCalendar';
import { DashboardAllEvents } from './components/DashboardAllEvents';
import { setAccessToken } from './components/accessToken';
import { CodeEditor } from './components/CodeEditor';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    main: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  }),
);

export const App = () => {
  const classes = useStyles({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/refresh_token", {
      method: "POST",
      credentials: "include"
    }).then(async x => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading)
    return <div>Loading... now...</div>

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        {/* <SideMenu /> */}
        <main className={classes.main}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/users-list' component={UsersList} />
            <Route path='/styled-example' component={StyledComponentsExample} />
            <Route path='/code-editor' component={CodeEditor} />
            <Route path='/signup' component={SignUp} />
            <Route path='/contact-us' component={ContactUs} />
            <Route path='/dashboard-upper' component={DashboardCalendar} />
            <Route path='/dashboard-lower' component={DashboardAllEvents} />
            <Route path='/forgotpassword' component={ForgotPassword} />
            <Route path='/resetpassword/:token' component={ResetPassword} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};
