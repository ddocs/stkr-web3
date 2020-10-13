import React from 'react';

import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Dropdown } from './Dropdown';
import { Providers } from '../../../../common/types';

const useStyles = makeStyles<Theme>(theme => ({
  block: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const DropdownStory = () => {
  const classes = useStyles();

  return (
    <div className={classes.block}>
      <Dropdown
        visible={true}
        address="0x603366e08380EceB2E334621A27eeD36F34A9D50"
        provider={Providers.metamask}
      />
    </div>
  );
};

export const DropdownExample = () => <DropdownStory />;

export default {
  title: 'modules/Layout/components/Dropdown',
};
