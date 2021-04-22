import classNames from 'classnames';
import React, { ReactNode, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useConnect } from '../../../../common/hooks/useConnect';
import { walletConversion } from '../../../../common/utils/convertWallet';
import { getWalletLink } from '../../../../common/utils/getWalletLink';
import { t } from '../../../../common/utils/intl';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Button } from '../../../../UiKit/Button';
import { CopiedIcon } from '../../../../UiKit/Icons/CopiedIcon';
import { CopyIcon } from '../../../../UiKit/Icons/CopyIcon';
import { ViewIcon } from '../../../../UiKit/Icons/ViewIcon';
import { NavLink } from '../../../../UiKit/NavLink';
import { SubTitle } from '../../../../UiKit/Typography/Typography';
import { WalletIcon } from '../WalletIcon';
import { useWalletCardStyles } from './WalletCardStyles';

interface IWalletProps {
  className?: string;
  visible?: boolean;
  address: string;
  balance?: ReactNode;
  name?: string;
  icon?: string;
}

export const WalletCard = ({
  className,
  address,
  visible = true,
  balance,
  name = t('providers.wallet-thumb'),
  icon,
}: IWalletProps) => {
  const { dispatchDisconnect } = useConnect();
  const classes = useWalletCardStyles({ icon });
  const [isCopy, setCopy] = useState<boolean>(false);

  useEffect(() => {
    if (isCopy) {
      setTimeout(() => {
        setCopy(false);
        (document.activeElement as any)?.blur();
      }, 1000);
    }
  }, [isCopy]);

  return (
    <BackgroundColorProvider
      className={classNames(
        classes.root,
        visible && classes.visible,
        className,
      )}
      component="div"
    >
      {address && (
        <>
          <div className={classes.info}>
            <WalletIcon icon={icon} className={classes.walletIcon} />

            <SubTitle className={classes.title}>{name}</SubTitle>

            <span className={classes.address}>{walletConversion(address)}</span>

            <Button
              className={classes.disconnect}
              onClick={dispatchDisconnect}
              variant="text"
              color="secondary"
            >
              {t('navigation.disconnect')}
            </Button>

            {balance && <div className={classes.balance}>{balance}</div>}
          </div>

          <div className={classes.navigation}>
            <div className={classes.copy}>
              <CopyToClipboard text={address} onCopy={() => setCopy(true)}>
                <Button
                  className={classes.copyAction}
                  variant="text"
                  color="secondary"
                  size="small"
                >
                  {isCopy ? (
                    <>
                      <CopiedIcon
                        className={classNames(classes.icon, classes.copied)}
                      />
                      {t('navigation.copied')}
                    </>
                  ) : (
                    <>
                      <CopyIcon className={classes.icon} />
                      {t('navigation.copy-address')}
                    </>
                  )}
                </Button>
              </CopyToClipboard>
            </div>

            <NavLink
              className={classes.view}
              color="secondary"
              href={getWalletLink(address)}
              size="small"
            >
              <ViewIcon className={classes.icon} />
              {t('navigation.view-on-etherscan')}
            </NavLink>
          </div>
        </>
      )}
    </BackgroundColorProvider>
  );
};
