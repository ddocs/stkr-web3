import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TimelineStatus } from './TimelineStatusDot';
import ComingIcon from './assets/coming.svg';
import CurrentIcon from './assets/current.svg';
import DoneIcon from './assets/done.svg';

const ICONS = {
  coming: ComingIcon,
  current: CurrentIcon,
  done: DoneIcon,
};

export const useTimelineStatusDotStyles = makeStyles<
  Theme,
  { status: TimelineStatus }
>(theme => ({
  root: ({ status }) => ({
    width: 24,
    height: 24,
    backgroundImage: `url(${ICONS[status]})`,
    backgroundColor: 'transparent',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 0',
    border: 0,
  }),
}));
