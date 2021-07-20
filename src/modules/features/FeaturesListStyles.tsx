import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

export const useFeaturesListStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 1400,
    margin: '0 auto',
  },
  toggler: {
    display: 'flex',
    background: '#242424',
    marginBottom: 59,
    marginTop: 70,
    margin: '0 auto',
    width: 'fit-content',
    borderRadius: 59,
  },
  togglerButton: {
    width: 185,
    height: 60,
    lineHeight: '60px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  activeTogglerButton: {
    background: '#006DFF',
    borderRadius: 59,
  },
}));
