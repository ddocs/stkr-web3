import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Total } from './Total';
import { t } from '../../common/utils/intl';
import { Button } from '../../UiKit/Button';
import { INDEX_PATH } from '../../common/const';
import { NavLink } from '../../UiKit/NavLink';

const useStyles = makeStyles(() => ({
  total: {
    width: 385,
    marginBottom: 32,
  },
}));

const TotalStory = () => {
  const classes = useStyles();
  return (
    <div>
      <Total className={classes.total} total={32} reward={1} />
      <Total className={classes.total} total={32} reward={1}>
        <NavLink
          style={{ minWidth: 100 }}
          href={INDEX_PATH}
          variant="outlined"
          size="large"
          color="primary"
        >
          {t('navigation.join')}
        </NavLink>
      </Total>
      <Total className={classes.total} total={32} reward={1}>
        <Button variant="text" size="medium" color="secondary">
          {t('navigation.edit')}
        </Button>
      </Total>
    </div>
  );
};

export const TotalExample = () => <TotalStory />;

export default {
  title: 'components/Total',
};
