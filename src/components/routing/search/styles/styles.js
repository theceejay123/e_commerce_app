import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingTop: 10
  },
  grid: {
    paddingTop: 0,
    paddingBottom: 2,
  },
  grid_container: {
    overflow: 'scroll',
    height: '81vh'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    marginTop: theme.spacing(2),
  },
  searchResult: {
    fontSize: 30,
    width: "100%",
    fontStyle: 'italic'
  }
}));

export default useStyles;