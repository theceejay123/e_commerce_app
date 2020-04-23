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
  successTitle: {
    alignSelf: 'center',
    fontStyle: 'italic',
    padding: '20px 0px 0px 0px',
    fontSize: '3rem'
  },
  content: {
    padding: 10,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  number: {
    fontWeight: 500
  },
  number__item: {
    color: 'red'
  },
  shop: {
    color: 'red',
    fontStyle: 'italic',
    fontSize: '1rem'
  },
  thankYou: {
    alignSelf: 'center',
  },
  grow: {
    flexGrow: 1
  },
  total: {
    fontSize: '1.5rem',
    display: 'flex'
  },
  item: {
    fontSize: '1.2rem',
    display: 'flex'
  },
  titleItem: {
    paddingTop: 20,
    fontStyle: 'italic',
    fontWeight: 600
  },
  itemPrice: {
    paddingRight: 5,
    borderRight: 'solid black 2px',
    marginRight: 5
  }
}))

export default useStyles;