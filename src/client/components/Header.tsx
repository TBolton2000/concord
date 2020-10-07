import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);
export const Header: React.FunctionComponent = () => {
  const classes = useStyles({});
  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <Typography variant='h6' noWrap>
          Concord
        </Typography>
        {/* Add a gear IconButton to the header and a display the users name at the top OR a "login/sing up" button */}
      </Toolbar>
    </AppBar>
  );
};
