import React from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { useStakerDasboardStyles } from './StakerDashboardStyles';

export const StakerDashboardComponent = () => {
  const classes = useStakerDasboardStyles();

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        StakerDashboardComponent
      </Curtains>
    </section>
  );
};

export const StakerDashboard = () => {
  return <StakerDashboardComponent />;
};
