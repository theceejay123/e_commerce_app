import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  "grid": {
    alignItems: 'center',
    justifyContent: 'center'
  },
  "root": {
    margin: 0,
    paddingTop: 10
  },
  "media": {
    height: '40rem',
  },
  "card": {
    width: '40%'
  },
}))

export default useStyles;