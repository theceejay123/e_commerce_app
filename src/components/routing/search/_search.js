import React, { useEffect, useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';

// Styles & UI-Components
import {
  Grid,
  TextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

import useStyles from './styles/styles';

// Custom Imports
import axios from 'axios';

const Search = ({ history }) => {
  const classes = useStyles();

  const { search } = useParams();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchParam, setSearchParam] = useState('');

  useEffect(() => {
    const getData = () => {
      let dataStorage = JSON.parse(localStorage.getItem("data"));
      if (!dataStorage) {
        axios.get("http://localhost:3000/products").then(res => {
          if (res.status === 200) {
            dataStorage = res.data;
            localStorage.setItem("data", JSON.stringify(res.data));
          }
        });
      }
      setProducts(dataStorage);
      setSearchParam(search.split("=")[1].length > 0 ? search.split("=")[1] : " ");
    };

    const getCategories = () => {
      axios.get("http://localhost:3000/categories").then(res => {
        if (res.status === 200) {
          setCategories(res.data);
        }
      });
    }

    getData();
    getCategories();
  }, []);

  useEffect(() => {
    if (searchParam.length > 0 || category.length > 0) {
      let filteredProductArray = products.filter(product => {
        return product.name.toLowerCase().match(searchParam);
      })

      let filteredCategoryArray = filteredProductArray.filter(filteredProduct => {
        return filteredProduct.category.name.match(category);
      })
      setFilteredProducts(filteredCategoryArray);
    } else {
      setFilteredProducts(products);
    }
  }, [searchParam, category]);

  const handleSearchChange = (evt) => {
    setSearchParam(evt.target.value)
  }

  const handleCategory = (evt) => {
    setCategory(evt.target.value);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="flex-end" className={classes.grid}>
        <Grid item>
          <SearchIcon />
        </Grid>
        <Grid item>
          <TextField type="text" onChange={handleSearchChange} defaultValue={search.split("=")[1].length > 0 ? search.split("=")[1] : ""} />
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-required-label">Category</InputLabel>
            <Select
              labelId="select-required-label"
              value={category}
              onChange={handleCategory}
              className={classes.select}
            >
              <MenuItem key={0} value={''}>
                All Categories
              </MenuItem>
              {categories.map(category => (
                <MenuItem key={category.id + 1} value={category.name}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Typography className={classes.searchResult}>Search Results: "{searchParam.length > 0 ? searchParam : " "}"</Typography>
      <Grid container spacing={2} className={classes.grid_container}>
        {filteredProducts.map(product => (
          <Grid item key={product.id}>
            <Card>
              <CardMedia
                component="img"
                alt={product.description}
                height="75"
                image={`http://localhost:3000${product.thumbnail_url}`}
                title={product.name}
              />
              <CardContent>
                <Typography>Product: {product.name}</Typography>
                <Typography>Category: {product.category.name}</Typography>
                <Button onClick={() => history.push(`/product/${product.id}`)} variant="text" color="primary">Info</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div >
  );
}

export default withRouter(Search);