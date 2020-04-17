import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

// Styling
import useStyles from './styles/styles';

const Navbar = ({ history, cProps }) => {
  const classes = useStyles();

  const handleKeyEnterSearchUp = (evt) => {
    if (evt.keyCode === 13) {
      console.log(evt.target.value);

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
          {/* if statement for login or logout */}
          {cProps.customer === null ? <Button color="inherit" onClick={() => history.push(`/login`)}>Login</Button> :
            <Button color="inherit" onClick={cProps.handleLogout}>Logout</Button>}
        </Toolbar>
      </AppBar >
    </div >
  );
}

export default withRouter(Navbar);