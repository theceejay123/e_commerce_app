import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  TextField,
  MenuItem
} from '@material-ui/core';

// Custom Styles
import useStyles from './styles/styles';

// Custom Imports
import axios from 'axios';

const Product = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState("Messier 7");

  const handleClick = () => {
    let isProduct = false;
    let cartArray = JSON.parse(sessionStorage.getItem("cartSession")) !== null ? JSON.parse(sessionStorage.getItem("cartSession")) : [];
    cartArray.forEach(product => {
      if (product.id === productDetail.id) {
        isProduct = !isProduct;
      }
    })
    if (!isProduct) cartArray.push({
      name: productDetail.name,
      id: productDetail.id,
      quantity: 1,
      image: productDetail.thumbnail_url,
      size: size
    });
    sessionStorage.setItem("cartSession", JSON.stringify(cartArray));
  }

  const handleChange = (evt) => {
    setSize(evt.target.value)
  }

  useEffect(() => {
    const getData = () => {
      let dataStorage = JSON.parse(localStorage.getItem("data"));
      if (dataStorage === null) {
        axios.get(`http://localhost:3000/products/${id}`).then(res => {
          if (res.status === 200) {
            setProductDetail(res.data);
          }
        });
      }

      if (dataStorage) {
        dataStorage.forEach(data => {
          if (parseInt(id) === data.id) {
            setProductDetail(data);
          }
        });
      }
    }

    const getSizes = () => {
      axios.get('http://localhost:3000/sizes').then(res => {
        if (res.status === 200) {
          setSizes(res.data);
        }
      })
    }

    getData();
    getSizes();
  }, [id]);

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={`http://localhost:3000${productDetail.image_url}`}
            title={productDetail.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">{productDetail.name}</Typography>
            <TextField
              select
              value={size}
              label="Size"
              onChange={handleChange}
              variant='outlined'
            >
              {sizes.map((option, index) => (
                <MenuItem key={index} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" color="secondary" disableElevation onClick={handleClick}>Add to Cart</Button>
            <Typography variant="h6" color="textSecondary" component="p">$ {productDetail.price}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">{productDetail.description}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Product;