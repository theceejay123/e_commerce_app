import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    paddingTop: 10
  },
  paper: {
    margin: 'auto',
    width: '70%',
    height: '90vh',
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
  },
  card: {
    margin: '0px 15px 10px 15px',
    padding: 10,
    display: 'flex'
  },
  media: {
    height: 75,
    width: 75
  },
  title: {
    fontSize: 20,
    fontStyle: 'italic'
  },
  content: {
    padding: "0px 10px 0px 10px !important",
    '&:last-child': {
      paddingBottom: "0 !important",
    },
  },
  grow: {
    flexGrow: 1,
  },
  content_end: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "0px 10px 0px 10px !important",
    '&:last-child': {
      paddingBottom: "0 !important",
    },
  },
  buttonCheckout: {
    width: '30%',
    margin: 'auto',
    marginBottom: 20,
    fontSize: 18,
    [theme.breakpoints.down('md')]: {
      width: '80%',
      fontSize: 18
    },
  }
}))

export default useStyles;