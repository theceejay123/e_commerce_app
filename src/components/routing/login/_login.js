import React, { useEffect, useState } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import {
  Face,
  Fingerprint
} from '@material-ui/icons';
import useStyles from './styles/styles';

const Login = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="email" label="Email" type="email" fullWidth autoFocus required />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="password" label="Password" type="password" fullWidth required />
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
        </Grid>
      </div>
    </Paper >
  )
}

export default Login;