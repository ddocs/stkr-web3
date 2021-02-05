import React, { useCallback } from 'react';
import { useBecomeProviderStyles } from './CreateSignatureStyles';
import { Headline1 } from '../../../../UiKit/Typography';
import { Button } from '../../../../UiKit/Button';
import { Typography } from '@material-ui/core';
import { StkrSdk } from '../../../api';
import { getNetworkName } from '../../../../common/utils/getNetworkName';
import { NotificationActions } from '../../../../store/actions/NotificationActions';
import { useDispatch } from 'react-redux';
import { t } from '../../../../common/utils/intl';

const parseSearchQuery = (): any => {
  const query = new URL(window.location.href);
  return {
    origin: query.searchParams.get('origin'),
  };
};

export const CreateSignature = () => {
  const classes = useBecomeProviderStyles({});
  const dispatch = useDispatch();
  const handleCreateSignature = useCallback(async () => {
    try {
      const stkrSdk = StkrSdk.getLastInstance();
      if (!stkrSdk) {
        throw new Error('there is not stkr sdk instance available');
      }
      await stkrSdk.connect();
      const accessToken = await stkrSdk.authorizeProvider(
        60 * 60 * 1000,
      ); /* 1 hour */
      if (!accessToken) {
        throw new Error('unable to obtain access token from stkr sdk');
      }

      const provider = stkrSdk.getKeyProvider();
      const address = provider.currentAccount();
      const networkId = provider.currentNetwork();
      const insuranceBalance = await stkrSdk
        .getContractManager()
        .etherBalanceOf(address);

      if (!networkId) {
        throw new Error('Not connected');
      }

      const network = getNetworkName(networkId);
      const sidecars = (await stkrSdk?.getProviderSidecars(0, 999))
        .filter(sidecar =>
          ['SIDECAR_STATUS_UNKNOWN', 'SIDECAR_STATUS_BLOCKED'].includes(
            sidecar.status,
          ),
        )
        .map(sidecar => ({
          name: sidecar.name,
          id: sidecar.id,
        }));

      if (window.opener) {
        window.opener.postMessage(
          {
            accessToken: accessToken.token,
            address,
            network,
            networkId,
            provider: provider.name,
            sidecars,
            insuranceBalance: insuranceBalance.toString(),
          },
          '*',
        );
        window.close();
      }
      window.parent?.postMessage({ accessToken: accessToken.token }, '*');
    } catch (error) {
      dispatch(
        NotificationActions.showNotification({
          message:
            error instanceof Error
              ? error.toString()
              : t(`iframe.error.${error.code}`),
          severity: 'error',
        }),
      );
    }
  }, [dispatch]);

  const { origin } = parseSearchQuery();
  if (origin !== 'ankr.com') {
    throw new Error('Not [ankr.com] domain not allowed');
  }
  return (
    <section className={classes.component} style={{ textAlign: 'center' }}>
      <Headline1 className={classes.title} component="h2">
        Access Request
      </Headline1>
      <div style={{ width: '100px', margin: 'auto' }}>
        <svg
          color="rgba(36, 90, 229, 0.9)"
          viewBox="0 0 100 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M101.442 26.484c.093 0 .138-.067.138-.146v-.127c0-.086-.049-.138-.138-.138h-.356v.411h.356zm-.355.194v.467h-.243v-1.27h.584c.258 0 .404.146.404.404 0 .224-.124.347-.278.388l.281.478h-.269l-.262-.467h-.217zm.136.91a1.077 1.077 0 0 0 1.175-1.174 1.095 1.095 0 0 0-.984-.983 1.078 1.078 0 0 0-1.176 1.175c.042.51.473.94.985.983zm-.165-2.379a1.327 1.327 0 1 1 0 0zM50.89 19.796l-.198.06a8.094 8.094 0 0 1-4.676-.013l-.198-.062 2.364-7.722c.058-.188.325-.187.381 0l2.328 7.737zM45.48 8.649l-6.544 19.186h4.416l1.429-4.664.2.06c2.17.666 4.56.672 6.73.017l.2-.06 1.4 4.647h4.408l-6.51-19.182a2.986 2.986 0 0 0-2.829-2.025h-.074a2.986 2.986 0 0 0-2.826 2.021zM90.905 11.926H86.22l-4.574 6.146V6.628h-3.953v21.208h3.953v-7.633l5.349 7.633h4.407l-5.847-8.242a.795.795 0 0 1 .025-.954l5.325-6.714zM70.176 11.925H63.826a3.543 3.543 0 0 0-3.546 3.54v12.37h3.954v-11.46a.91.91 0 0 1 .91-.91h4.122a.91.91 0 0 1 .91.91v11.46h3.953v-12.37a3.543 3.543 0 0 0-3.545-3.54h-.408zM102.647 11.925h-5.378a3.543 3.543 0 0 0-3.546 3.54v12.37h3.953v-11.46a.91.91 0 0 1 .91-.91h4.061v-3.54zM18.13.884l11.104 5.69a4.798 4.798 0 0 1 2.622 4.286v2.594H27.76V10.86a.726.726 0 0 0-.397-.648l-11.103-5.69a.732.732 0 0 0-.666 0l-11.104 5.69a.726.726 0 0 0-.396.648v2.594H0V10.86a4.798 4.798 0 0 1 2.621-4.286L13.726.884a4.836 4.836 0 0 1 4.404 0zm1.301 16.244c0-1.93-1.572-3.5-3.504-3.5a3.506 3.506 0 0 0-3.505 3.5c0 1.93 1.572 3.5 3.505 3.5a3.507 3.507 0 0 0 3.504-3.5zm7.934 7.262a.725.725 0 0 0 .396-.648v-2.594h4.095v2.595a4.798 4.798 0 0 1-2.62 4.285l-11.106 5.69a4.854 4.854 0 0 1-2.202.53 4.855 4.855 0 0 1-2.202-.53L2.62 28.028a4.797 4.797 0 0 1-2.62-4.285v-2.595h4.094v2.595c0 .274.152.522.396.647l9.39 4.811v-4.767c-3.199-.894-5.553-3.83-5.553-7.306 0-4.185 3.41-7.59 7.6-7.59 4.19 0 7.6 3.405 7.6 7.59 0 3.476-2.354 6.412-5.553 7.306v4.768l9.39-4.812z"
            fill="currentColor"
          />
        </svg>
      </div>
      <Typography className={classes.text} component="p">
        Would you like to let{' '}
        <span
          style={{
            fontWeight: 'bold',
            color: 'rgba(36, 90, 229, 0.9)',
          }}
        >
          ankr.com
        </span>{' '}
        access your{' '}
        <span
          style={{
            fontWeight: 'bold',
            color: '#FFE600',
          }}
        >
          stkr.io
        </span>{' '}
        account?
      </Typography>
      <div
        className={classes.textWrapper}
        style={{ width: '200px', margin: 'auto' }}
      >
        <Button
          className={classes.button}
          color="primary"
          size="large"
          style={{
            margin: 'auto',
            marginTop: '20px',
          }}
          onClick={handleCreateSignature}
        >
          Grant Access
        </Button>
        <Button
          className={classes.mobileButton}
          color="primary"
          size="large"
          style={{
            margin: 'auto',
            marginTop: '20px',
          }}
          onClick={handleCreateSignature}
        >
          Grant Access
        </Button>
      </div>
      <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
        Pressing this button will prompt you for your login credentials
      </p>
    </section>
  );
};
