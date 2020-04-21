import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton,
} from '@material-ui/core';
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon
} from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

// Styling
import useStyles from './styles/styles';

const Navbar = ({ history, cProps }) => {
  const classes = useStyles();

  const handleKeyEnterSearchUp = (evt) => {
    if (evt.keyCode === 13) {
      history.push(`/search/search_term=${evt.target.value}`);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Button color="inherit" onClick={() => history.push('/home')}>The Prints</Button>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search By Product…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyUp={handleKeyEnterSearchUp}
            />
          </div>
          <div className={classes.grow} />
          <IconButton aria-label="show 11 new notifications" color="inherit" onClick={() => history.push('/cart')}>
            <ShoppingCartIcon />
          </IconButton>
          {/* if statement for login or logout */}
          {cProps.customer === null ? <Button color="inherit" onClick={() => history.push(`/login`)}>Login</Button> :
            <Button color="inherit" onClick={cProps.handleLogout}>Logout</Button>}
        </Toolbar>
      </AppBar >
    </div >
  );
}

export default withRouter(Navbar);