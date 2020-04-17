import React, { useEffect, useState } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import useStyles from './styles/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = (props) => {
  const classes = useStyles();

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const getData = () => {
      axios.get("http://localhost:3000/provinces")
        .then(res => {
          if (res.status === 200) {
            const data = res.data;
            setProvinces(data);
          }
        })
    };

    getData();
  }, [])

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    password: "",
    address: "",
    email: "",
    phone_number: "",
    province_id: 1
  })

  const handleChange = (name) => (evt) => {
    setValues({ ...values, [name]: evt.target.value })
  }

  const handleProvinceChange = (evt) => {
    setValues({ ...values, province_id: evt.target.value })
  }

  const handleSubmit = () => {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    let body = {
      "first_name": values.first_name,
      "last_name": values.last_name,
      "email": values.email,
      "password": values.password,
      "address": values.address,
      "phone_number": values.phone_number,
      "province_id": values.province_id
    }

    axios.post("http://localhost:3000/customers", body, {
      headers
    }).then(res => {
      if (res.status === 200) {
        localStorage.setItem("token", res.data.jwt);
        props.handleLogin(res.data.customer)
      }
    }).catch(e => console.log(e))
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="first_name" label="First Name" type="text" fullWidth autoFocus required onChange={handleChange("first_name")} />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="last_name" label="Last Name" type="text" fullWidth required onChange={handleChange("last_name")} />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="address" label="Address" type="text" fullWidth required onChange={handleChange("address")} />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <FormControl required className={classes.formControl}>
              <InputLabel id="select-required-label">Province</InputLabel>
              <Select
                labelId="select-required-label"
                value={values.province_id}
                onChange={handleProvinceChange}
                className={classes.select}
              >
                {provinces.map(province => (
                  <MenuItem key={province.id} value={province.id}>{province.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="phone_number" label="Phone Number (xxxXXXxxxx)" type="text" fullWidth required onChange={handleChange("phone_number")} />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="email" label="Email" type="email" fullWidth required onChange={handleChange("email")} />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="password" label="Password" type="password" fullWidth required onChange={handleChange("password")} />
          </Grid>
        </Grid>
        <Link to="/login">
          Registered already?
        </Link>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={handleSubmit}>Submit Registration</Button>
        </Grid>
      </div>
    </Paper >
  )
}

export default Register;