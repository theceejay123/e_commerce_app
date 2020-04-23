import React, { useEffect, useState } from 'react';
// import { setCookie, getCookie, removeCookie } from 'react-cookies';
import queryString from 'query-string';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import {
  Paper,
  Typography
} from '@material-ui/core';
import useStyles from './styles/styles';

const Success = (props, { history }) => {
  const classes = useStyles();
  const [orderDetail, setOrderDetail] = useState(JSON.parse(sessionStorage.getItem("orderDetail")));

  useEffect(() => {
    const fetchOrderDetailData = () => {
      const sessionId = JSON.parse(sessionStorage.getItem("sessionId"));
      if (queryString.parse(props.location.search).session_id !== sessionId || sessionId === null) {
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
      {console.log(orderDetail)}
      {orderDetail !== undefined && orderDetail !== null ?
        <Paper className={classes.paper}>
          <Typography variant='h4' className={classes.successTitle}>Transaction Successful</Typography>
          <Typography variant="subtitle2" className={classes.thankYou}>Thank you for choosing <span className={classes.shop}>The Prints</span></Typography>
          <div className={classes.content}>
            <Typography className={classes.number} variant="h6">Transaction Number: #<span className={classes.number__item}>{orderDetail.order.reference_number}</span></Typography>
            <div>
              <Typography className={classes.titleItem} variant='h6'>Items:</Typography>
              {orderDetail.products.map((product, index) => (
                <Typography key={product.id} className={classes.item}><span>{product.name}</span><span className={classes.grow} />$<span className={classes.itemPrice}>{orderDetail.order_details[index].price}</span><Link to={`/product/${product.id}`}>info</Link></Typography>
              ))}
            </div>
            <div className={classes.grow} />
            <Typography className={classes.total}><span>Total:</span><span className={classes.grow} /><span>${orderDetail.order.total}</span></Typography>
          </div>
        </Paper> : <></>}
    </div>
  )
}

export default Success;