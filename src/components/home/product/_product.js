import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';

// Custom Styles
import useStyles from './styles/styles';

// Custom Imports
import axios from 'axios';

const Product = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  useEffect(() => {
    const getData = () => {
      axios.get(`http://localhost:3000/products/${id}`).then(res => {
        if (res.status === 200) {
          setProductDetail(res.data);
        }
      });
    }

    getData();
    console.log("did this get run twice?");
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
            <Button variant="contained" color="secondary" disableElevation>Add to Cart</Button>
            <Typography variant="h6" color="textSecondary" component="p">$ {productDetail.price}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">{productDetail.description}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Product;