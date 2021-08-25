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
    const stakeAccount = Keypair.generate();
    const authorized = new Authorized(publicKey, publicKey);
    // const votePublicKey = new PublicKey('ArHE87oRDeQBh33ZZRxuyaAWDRS4CwE3Ye3PzqN6w2bz');
    const votePublicKey = new PublicKey(
      '57FPWd5YujVUooeo3rvLn9MeC4DkddLf4NnTcUTMonxT',
    );
    let signature: TransactionSignature = '';
    try {
      // 1. Create stake account and put 1.5 SOL there
      // const transaction = new Transaction().add(
      //   StakeProgram.createAccount({
      //     fromPubkey: publicKey,
      //     stakePubkey: stakeAccount.publicKey,
      //     authorized: authorized,
      //     lamports: LAMPORTS_PER_SOL * 15 / 10,
      //   })
      // );
      const stakeAccountPublicKey = await PublicKey.createWithSeed(
        publicKey,
        'ankr:00',
        StakeProgram.programId,
      );
      const transaction = new Transaction().add(
        StakeProgram.createAccountWithSeed({
          fromPubkey: publicKey,
          stakePubkey: stakeAccountPublicKey,
          basePubkey: publicKey,
          seed: 'ankr:00',
          authorized: authorized,
          lamports: (LAMPORTS_PER_SOL * 15) / 10,
        }),
      );
      // signature = await sdk.sendTransaction(signTransaction, wallet, publicKey, transaction, connection);
      // notify('info', 'Transaction sent:', signature);
      // 2. Initialize created stake account
      // transaction.add(
      //   StakeProgram.initialize( {
      //     stakePubkey: stakeAccount.publicKey,
      //     authorized: authorized,
      //   })
      // )
      // 3. Do the stake
      transaction.add(
        StakeProgram.delegate({
          // stakePubkey: stakeAccount.publicKey,
          stakePubkey: stakeAccountPublicKey,
          authorizedPubkey: authorized.staker,
          votePubkey: votePublicKey,
        }),
      );
      signature = await sdk.sendTransaction(
        signTransaction,
        wallet,
        publicKey,
        transaction,
        connection,
      );
      notify('info', 'Transaction sent:', signature);

      await connection.confirmTransaction(signature);
      console.log(`Stake account: ${stakeAccount.publicKey.toString()}`);
      console.log(
        `SENT TX: https://explorer.solana.com/tx/${signature}?cluster=testnet`,
      );
      notify('success', 'Stake transaction successful!', signature);
    } catch (error) {
      notify('error', `Stake transaction failed! ${error.message}`, signature);
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
      Create stake account and stake 1.5 SOL (testnet)
    </Button>
  );
};

export default CreateStakeAccountAndStake;
