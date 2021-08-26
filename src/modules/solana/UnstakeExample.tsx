import { Button, Link, makeStyles } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Authorized,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  StakeProgram,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';
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

const Unstake: FC = () => {
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
    const stakeAccount = Keypair.generate();
    const authorized = new Authorized(publicKey, publicKey);
    // const votePublicKey = new PublicKey('ArHE87oRDeQBh33ZZRxuyaAWDRS4CwE3Ye3PzqN6w2bz');
    const votePublicKey = new PublicKey(
      '57FPWd5YujVUooeo3rvLn9MeC4DkddLf4NnTcUTMonxT',
    );
    let signature: TransactionSignature = '';
    try {
      const stakeAccountPublicKey = await PublicKey.createWithSeed(
        publicKey,
        'ankr:00',
        StakeProgram.programId,
      );
      const unstakeAccountPublicKey = await PublicKey.createWithSeed(
        publicKey,
        'ankr:00:unstake',
        StakeProgram.programId,
      );
      const transaction = new Transaction().add(
        StakeProgram.split({
          stakePubkey: stakeAccountPublicKey,
          authorizedPubkey: publicKey,
          splitStakePubkey: unstakeAccountPublicKey,
          lamports: (LAMPORTS_PER_SOL * 5) / 10,
        }),
      );
      // transaction.add(
      //   StakeProgram.deactivate({
      //     stakePubkey: unstakeAccountPublicKey,
      //     authorizedPubkey: publicKey,
      //   }),
      // );

      signature = await sdk.sendTransaction(
        signTransaction,
        wallet,
        publicKey,
        transaction,
        connection,
      );
      notify('info', 'Transaction sent:', signature);

      await connection.confirmTransaction(signature);
      console.log(
        `SENT TX: https://explorer.solana.com/tx/${signature}?cluster=testnet`,
      );
      notify('success', 'Unstake transaction successful!', signature);
    } catch (error) {
      notify(
        'error',
        `Unstake transaction failed! ${error.message}`,
        signature,
      );
      console.log(`TRANSACTION error: ${error}`);
      return;
    }
  }, [sdk, notify, wallet, publicKey, connection, signTransaction]);

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      disabled={!publicKey}
    >
      Unstake 0.5 SOL (testnet)
    </Button>
  );
};

export default Unstake;
