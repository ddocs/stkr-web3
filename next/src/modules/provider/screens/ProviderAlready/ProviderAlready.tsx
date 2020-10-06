import * as React from 'react';
import { useProviderAlreadyStyles } from './ProviderAlreadyStyles';

interface IProviderAlreadyProps {}

export const ProviderAlready = () => {
  const classes = useProviderAlreadyStyles();
  return <div className={classes.component} />;
};
