import { Button, Link, makeStyles } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useSnackbar, VariantType } from 'notistack';
import React, { FC, useCallback } from 'react';
import { useConnection } from './useConnection';
import { useSdk } from './useSdk';

const useStyles = makeStyles({
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 16,
    textDecoration: 'underline',
    '&:hover': {
      color: '#000000',
    },
  },
  icon: {
    fontSize: 20,
    marginLeft: 8,
  },
});

const CreateStakeAccountAndStake: FC = () => {
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { connection } = useConnection();
  const { wallet, publicKey, signTransaction } = useWallet();
  const { sdk } = useSdk();

  const notify = useCallback(
    (variant: VariantType, message: string, signature?: string) => {
      enqueueSnackbar(
        <span className={styles.message}>
          {message}
          {signature && (
            <Link
              className={styles.link}
              href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
              target="_blank"
            >
              Transaction
              <LaunchIcon className={styles.icon} />
            </Link>
          )}
        </span>,
        { variant },
      );
    },
    [enqueueSnackbar, styles],
  );

  const onClick = useCallback(async () => {
    if (!publicKey || !wallet) {
      notify('error', 'Wallet not connected!');
      return;
    }
    if (!sdk) {
      notify('error', 'SDK is not initialized');
      return;
    }
    if (!connection) {
      notify('error', 'Connection is not initialized');
      return;
    }

    await sdk.createStakeAccountWithSeed(
      publicKey,
      'ankr:00',
      (LAMPORTS_PER_SOL * 15) / 10,
      '57FPWd5YujVUooeo3rvLn9MeC4DkddLf4NnTcUTMonxT',
      connection,
      wallet,
      signTransaction,
      notify,
    );
  }, [sdk, notify, wallet, publicKey, connection, signTransaction]);

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      disabled={!publicKey}
    >
      Create stake account and stake 1.5 SOL (ankr:00)
    </Button>
  );
};

export default CreateStakeAccountAndStake;
