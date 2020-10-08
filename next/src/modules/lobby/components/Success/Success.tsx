import React from 'react';
import { useSuccessStyles } from './SuccessStyles';
import { Headline3 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { defineFlowStep } from '../../../../components/Flow/definition';

export const SuccessComponent = () => {
  const classes = useSuccessStyles();

  return (
    <div className={classes.component}>
      <Headline3 className={classes.title}>
        {t('common.marketing.success')}
      </Headline3>
    </div>
  );
};

export const Success = defineFlowStep({
  Body: SuccessComponent,
});
