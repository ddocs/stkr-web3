import React from 'react';
import { useMicropoolListStyles } from './EmptyListStyles';
import classNames from 'classnames';
import { t } from '../../../../common/utils/intl';
import { Body2, Headline4 } from '../../../../UiKit/Typography';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { NavLink } from '../../../../UiKit/Link';
import { CREATE_PROVIDERS_BEACON_CHAIN_PATH } from '../../../../common/const';
import { Icon } from './Icon';

interface IEmptyListProps {
  className?: string;
}

export const EmptyList = ({ className }: IEmptyListProps) => {
  const classes = useMicropoolListStyles();

  return (
    <BackgroundColorProvider
      className={classNames(classes.component, className)}
    >
      <Headline4 className={classes.title} color="primary">
        {t('micro-pool-table.empty.title')}
      </Headline4>
      <Body2 className={classes.text} component="p">
        {t('micro-pool-table.empty.paragraph-1')}
      </Body2>
      <Body2 className={classes.text} component="p">
        {t('micro-pool-table.empty.paragraph-2')}
      </Body2>
      <NavLink
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
        href={CREATE_PROVIDERS_BEACON_CHAIN_PATH}
      >
        {t('navigation.create')}
      </NavLink>
      <Icon className={classes.icon} />
    </BackgroundColorProvider>
  );
};
