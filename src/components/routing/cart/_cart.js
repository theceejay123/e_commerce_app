import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import {
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  TextField,
  MenuItem,
  Button
} from '@material-ui/core';

import {
  Delete as DeleteIcon
} from '@material-ui/icons';

import useStyles from './styles/styles';

const Cart = (props) => {
  const classes = useStyles();

  const [cart, setCart] = useState([]);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    setCart(JSON.parse(sessionStorage.getItem("cartSession")));
  }, [])

  const fetchCheckoutSession = async () => {
    const cart_no_images = cart.map(item => {
      return {
        quantity: item.quantity,
        id: item.id
      }
    })

    const payload = {
      cart: JSON.stringify(cart_no_images),
      id: props.customer.id
    }

    const sessionData = await fetch("http://localhost:3000/checkout/create", {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: queryString.stringify(payload)
    }).then(res => res.json())
      .then(res => res)

    return sessionData.session.id;
    // return payload;
  }

  const handleDelete = (productId) => {
    const cartArray = cart.filter(product => product.id !== productId)
    sessionStorage.setItem("cartSession", JSON.stringify(cartArray))
    setCart(cartArray);
  }
  const handleChange = (product) => (evt) => {
    const cartArray = cart.map(item => item.id === product.id ? { ...item, quantity: evt.target.value } : item);
    sessionStorage.setItem("cartSession", JSON.stringify(cartArray));
    setCart(cartArray);
  }

  const handleCheckout = async () => {
    if (props.customer === null || props.customer === undefined || props.customer.length === 0) {
      props.history.push('/login');
    } else {
      console.log(await fetchCheckoutSession());
      console.log(cart);
      console.log(props.customer);

      const sessionId = await fetchCheckoutSession();
      const stripe = await props.stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      })

      console.log(error.message);
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {cart !== null && cart.length > 0 ? cart.map((eachItem, index) => (
          <Card className={classes.card} key={index}>
            <CardMedia
              className={classes.media}
              image={`http://localhost:3000${eachItem.image}`}
              title={eachItem.name}
            />
            <CardContent className={classes.content}>
              <Typography className={classes.title} variant='h6'>{eachItem.name}</Typography>
              <Typography variant='subtitle1'>Size: {eachItem.size}</Typography>
            </CardContent>
            <div className={classes.grow} />
            <CardContent className={classes.content_end}>
              <TextField
                select
                value={eachItem.quantity}
                label="Quantity"
                onChange={handleChange(eachItem)}
                variant='outlined'
              >
                {numbers.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <IconButton color="inherit" onClick={() => handleDelete(eachItem.id)}>
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        )) : <Typography className={classes.noItem}>No Items In The Cart</Typography>
        }
        <div className={classes.grow} />
        <Button color="secondary" variant="contained" className={classes.buttonCheckout} onClick={handleCheckout} disabled={cart === null || cart.length === 0}>Complete Checkout</Button>
      </Paper>
    </div >)
}

export default withRouter(Cart);