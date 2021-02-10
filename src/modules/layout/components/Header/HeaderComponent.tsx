import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React from 'react';
import { FocusOn } from 'react-focus-on';
import { Providers } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { Button } from '../../../../UiKit/Button';
import { Curtains } from '../../../../UiKit/Curtains';
import { Links } from '../Links';
import { LocaleLinks } from '../LocaleLinks';
import { LocaleSwitcher } from '../LocaleSwitcher';
import { Logotype } from '../Logotype';
import { Switcher } from '../Switcher';
import { Toggle } from '../Toggle';
import { Wallet } from '../Wallet';
import { WalletBalance } from '../WalletBalance';
import { WalletCard } from '../WalletCard';
import { useHeader } from './useHeader';

interface IHeaderFrameProps {
  isAuth: boolean;
  walletAddress?: string;
  walletType?: Providers;
  ethereumBalance?: BigNumber;
  ankrBalance?: BigNumber;
}

export const HeaderComponent = ({
  isAuth,
  walletAddress,
  walletType,
  ethereumBalance,
  ankrBalance,
}: IHeaderFrameProps) => {
  const {
    mobileNavShowed,
    modalControlRef,
    classes,
    showSwitcher,
    isLGUp,
    isMDUp,
    isSMUp,
    isFilteredError,
    handleConnect,
    handleMobileNavClose,
    handleMobileNavOpen,
  } = useHeader();

  const renderedSwitcher = showSwitcher && <Switcher />;

  const renderedBalance = (
    <WalletBalance ethereum={ethereumBalance} ankr={ankrBalance} />
  );

  const renderedAppButton = (
    <Button
      onClick={handleConnect}
      className={classes.appButton}
      color="primary"
      size="large"
      fullWidth
    >
      {t('navigation.unlock-wallet')}
    </Button>
  );

  const renderedErrorHandler = (
    <MutationErrorHandler
      type={UserActionTypes.CONNECT}
      resetOnShow={false}
      filter={isFilteredError}
    />
  );

  const renderedLinks = <Links isAuth={isAuth} />;

  const renderedMobileNav = (
    <>
      <div
        className={classNames(
          classes.navShadow,
          mobileNavShowed && classes.navShadowActive,
        )}
      />

      <FocusOn
        enabled={mobileNavShowed}
        onEscapeKey={handleMobileNavClose}
        onClickOutside={handleMobileNavClose}
        shards={[modalControlRef]}
      >
        <div
          className={classNames(
            classes.mobileNav,
            mobileNavShowed && classes.mobileNavActive,
          )}
        >
          {!isAuth && renderedErrorHandler}

          {isAuth && !isMDUp && (
            <WalletCard
              className={classes.walletCard}
              address={walletAddress}
              provider={walletType}
              balance={renderedBalance}
            />
          )}

          {!isSMUp && !isAuth && renderedAppButton}

          {renderedLinks}

          {!isLGUp && <LocaleLinks className={classes.localLinks} />}
        </div>
      </FocusOn>
    </>
  );

  return (
    <>
      <header className={classes.component}>
        <Curtains
          classes={{
            root: classNames(classes.inner, isAuth && classes.innerAuthorized),
          }}
        >
          <Logotype className={classes.logo} />

          {!isAuth && isLGUp && renderedErrorHandler}

          {isAuth && isLGUp && renderedSwitcher}

          {isLGUp && renderedLinks}

          {!isAuth && isSMUp && renderedAppButton}

          {isAuth && isMDUp && (
            <Wallet
              className={classes.wallet}
              address={walletAddress}
              provider={walletType}
              balance={renderedBalance}
            >
              <WalletCard address={walletAddress} provider={walletType} />
            </Wallet>
          )}

          {isLGUp && <LocaleSwitcher />}

          {!isLGUp && (
            <Toggle
              className={classes.toggle}
              onClick={
                mobileNavShowed ? handleMobileNavClose : handleMobileNavOpen
              }
              ref={modalControlRef}
              opened={mobileNavShowed}
            />
          )}
        </Curtains>
      </header>

      {!isLGUp && renderedMobileNav}
    </>
  );
};
