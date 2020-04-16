import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: 20,
    width: 800,
    height: '70vh',
    margin: 'auto'
  },
  content: {
    height: '100%',
    padding: 10,
    margin: 'auto'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    marginTop: theme.spacing(2),
  }
}));

export default useStyles;