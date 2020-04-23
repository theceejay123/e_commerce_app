import React, { useEffect, useState } from 'react';
// import { setCookie, getCookie, removeCookie } from 'react-cookies';
import queryString from 'query-string';
import Axios from 'axios';

import {
  Paper,
  Typography
} from '@material-ui/core';
import useStyles from './styles/styles';

const Success = (props, { history }) => {
  const classes = useStyles();
  const [orderDetail, setOrderDetail] = useState([JSON.parse(sessionStorage.getItem("orderDetail"))]);

  useEffect(() => {
    const fetchOrderDetailData = () => {
      const sessionId = JSON.parse(sessionStorage.getItem("sessionId"));
      if (queryString.parse(props.location.search).session_id !== sessionId) {
        Axios.get("http://localhost:3000/checkout/success", {
          params: {
            cart: JSON.stringify(JSON.parse(queryString.parse(props.location.search).cart)),
            sessionId: queryString.parse(props.location.search).session_id,
            id: JSON.parse(queryString.parse(props.location.search).id)
          }
        }).then(res => {
          if (res.status === 200) {
            setOrderDetail(res.data);
            sessionStorage.setItem("orderDetail", JSON.stringify(res.data));
            sessionStorage.setItem("sessionId", JSON.stringify(queryString.parse(props.location.search).session_id));
          }
        })
      }
    }

    const deleteCart = () => {
      sessionStorage.removeItem("cartSession");
    }

    fetchOrderDetailData();
    deleteCart();
  }, [])

  return (
    <div className={classes.root}>
      {console.log(orderDetail[0])}
      <Paper className={classes.paper}>
        <Typography>Transaction Number: #{orderDetail[0].order.reference_number}</Typography>
        <Typography>Total: ${orderDetail[0].order.total}</Typography>
        <div>
          <Typography>Items:</Typography>
          {orderDetail[0].products.map(product => (
            <Typography key={product.id}>{product.name} </Typography>
          ))}
        </div>
      </Paper>
    </div>
  )
}

export default Success;