import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

// Styling
import useStyles from './styles/styles';

const Navbar = () => {
  const classes = useStyles();

  return (

    // <div className="navbar">
    //   <ul className="navbar-list">
    //     <li className="navbar-list-item"><Link to="/">Home</Link></li>
    //     <li className="navbar-list-item"><Link to="/about">About</Link></li>
    //     <li className="navbar-list-item"><Link to="/contact">Contact</Link></li>
    //   </ul>
    // </div>

    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            The Prints
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;