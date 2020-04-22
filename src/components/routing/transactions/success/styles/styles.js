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
  }
}))

export default useStyles;