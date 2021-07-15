import React from 'react';
import classNames from 'classnames';
import { Curtains } from '../../../../../UiKit/Curtains';
import { Logotype } from '../Logotype';
import { useHeaderStyles } from './HeaderStyles';
import { Button } from '../../../../../UiKit/Button';
import { t } from '../../../../../common/utils/intl';

interface IHeaderFrameProps {}

export const HeaderComponent = ({}: IHeaderFrameProps) => {
  const classes = useHeaderStyles();

  return (
    <>
      <header className={classes.component}>
        <Curtains
          classes={{
            root: classNames(classes.inner),
          }}
        >
          <Logotype />
          <Button
            color="primary"
            className={classes.button}
            onClick={() => null}
          >
            {t('polkadot-slot-auction.connect-button')}
          </Button>
        </Curtains>
      </header>
    </>
  );
};
