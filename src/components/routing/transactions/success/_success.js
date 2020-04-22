import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import Axios from 'axios';

const Success = (props, { history }) => {
  const [cart, setCart] = useState(JSON.parse(queryString.parse(props.location.search).cart))
  const [sessionId, setSessionId] = useState(queryString.parse(props.location.search).session_id)
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    const fetchOrderDetailData = () => {
      Axios.get("http://localhost:3000/checkout/success", {
        params: {
          cart: JSON.stringify(cart),
          sessionId: sessionId,
          id: JSON.parse(queryString.parse(props.location.search).id)
        }
      }).then(res => {
        if (res.status === 200) {
          console.log(res.data);
        }
      })
    }

    const deleteCart = () => {
      sessionStorage.removeItem("cartSession");
    }

    fetchOrderDetailData();
    deleteCart();
  }, [])

  return (
    <div>
      {/* {console.log(JSON.parse(queryString.parse(props.location.search).cart))} */}
    </div>
  )
}

export default Success;