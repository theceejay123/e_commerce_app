import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
import useStyles from './styles/styles';
import axios from 'axios';

const Login = (props) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  const handleChange = (name) => (evt) => {
    setValues({ ...values, [name]: evt.target.value })
  }

  const handleSubmit = () => {
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    const body = {
      "email": values.email,
      "password": values.password
    }

    axios.post("http://localhost:3000/login", body, {
      headers
    }).then(res => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data.jwt)
        props.handleLogin(res.data.customer)
      }
    })
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="email" label="Email" type="email" fullWidth autoFocus required onChange={handleChange("email")} />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="password" label="Password" type="password" fullWidth required onChange={handleChange("password")} />
          </Grid>
        </Grid>
        <Link to="/register">
          Not registered yet?
        </Link>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={handleSubmit} >Login</Button>
        </Grid>
      </div>
    </Paper >
  )
}

export default Login;