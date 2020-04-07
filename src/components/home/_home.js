import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

// Styles & UI-Components
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import useStyles from './styles/styles';

// Custom Imports
import axios from 'axios';

const Home = ({ history }) => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = () => {
      axios.get("http://localhost:3000/products").then(res => {
        if (res.status === 200) {
          setProducts(res.data);
        }
      });
    };

    getData();
  }, []);

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={6} className={classes.gridList} cols={3}>
        {products.map(product => (
          <GridListTile key={product.id} onClick={() => history.push(`/product/${product.id}`)}>
            <img src={`http://localhost:3000${product.image_url}`} alt={product.name} />
            <GridListTileBar
              title={product.name}
              titlePosition="top"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div >
  );
}

export default withRouter(Home);