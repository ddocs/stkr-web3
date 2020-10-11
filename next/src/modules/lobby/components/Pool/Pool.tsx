import * as React from 'react';
import { usePoolStyles } from './PoolStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import classNames from 'classnames';
import { t } from '../../../../common/utils/intl';
import { PoolTable } from '../PoolTable';
import { Button } from '../../../../UiKit/Button';
import { Headline1 } from '../../../../UiKit/Typography';
import { useAction } from '../../../../store/redux';
import { openUnlockWalletAction } from '../../../../store/modals/actions';
import { useAuthentication } from '../../../../common/utils/useAuthentications';

interface IPoolProps {
  className?: string;
}

export const Pool = ({ className }: IPoolProps) => {
  const classes = usePoolStyles();
  const { isAuthenticated } = useAuthentication();

  const openUnlockWallet = useAction(openUnlockWalletAction);

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains className={classes.wrapper}>
        <Headline1 className={classes.title} component="h2">
          {t('about.pool-title')}
        </Headline1>
        <PoolTable
          className={classNames(
            classes.table,
            !isAuthenticated && classes.disabled,
          )}
        />
        {!isAuthenticated && (
          <>
            <span className={classes.note}>{t('about.pool-note')}</span>
            <Button
              className={classes.button}
              color="primary"
              size="large"
              onClick={openUnlockWallet}
            >
              {t('navigation.unlock-your-wallet')}
            </Button>
          </>
        )}
      </Curtains>
    </section>
  );
};
