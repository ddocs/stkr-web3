import { Box, Button } from '@material-ui/core';
import React from 'react';
import { t } from '../../../../common/utils/intl';
import { ReactComponent as EmptyNodeListImage } from './assets/emptyNodeList.svg';
import { useEmptyNodeListStyles } from './EmptyNodeListStyles';

interface IEmptyNodeList {
  onSubmit: () => void;
}

export const EmptyNodeList = ({ onSubmit }: IEmptyNodeList) => {
  const classes = useEmptyNodeListStyles();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <EmptyNodeListImage className={classes.image} />
      <Button
        color="primary"
        size="large"
        onClick={onSubmit}
        fullWidth={true}
        className={classes.button}
      >
        <span className={classes.buttonTextShort}>
          {t('empty-node-list.submit-short')}
        </span>
        <span className={classes.buttonTextFull}>
          {t('empty-node-list.submit-full')}
        </span>
      </Button>
    </Box>
  );
};
