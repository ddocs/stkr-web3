import React from 'react';
import { t } from '../../../../common/utils/intl';
import { ReactComponent as EmptyNodeListImage } from './assets/emptyNodeList.svg';
import { Box, Button } from '@material-ui/core';
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
        {t('empty-node-list.submit')}
      </Button>
    </Box>
  );
};
