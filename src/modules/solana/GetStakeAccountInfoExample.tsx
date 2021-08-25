import { Button, Link, makeStyles } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Keypair,
  ParsedInstruction,
  PublicKey,
  StakeProgram,
  SystemProgram,
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

const GetStakeAccountInfo: FC = () => {
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
    // 1. Get current balance on selected wallet
    const accountInfo = await connection.getAccountInfo(publicKey);
    if (accountInfo) {
      notify('info', `Balance on selected wallet: ${accountInfo.lamports}`);
      console.log(`Balance on selected wallet: ${accountInfo.lamports}`);
    }
    // 2. See if there are existing Stake accounts with StakeKey or WithdrawKey equal to the public key of the selected wallet account
    const signatures = await connection.getSignaturesForAddress(publicKey);
    const stakeAccounts: Array<PublicKey> = [];
    for (let i = 0; i < signatures.length; i++) {
      if (signatures[i] && !signatures[i].err) {
        const tx = await connection.getParsedConfirmedTransaction(
          signatures[i].signature,
        );
        if (!tx) {
          continue;
        }
        for (let j = 0; j < tx.transaction.message.instructions.length; j++) {
          try {
            const inst = tx.transaction.message.instructions[
              j
            ] as ParsedInstruction;
            if (
              inst.program === 'system' &&
              (inst.parsed.type === 'createAccount' ||
                inst.parsed.type === 'createAccountWithSeed') &&
              inst.parsed['info']['owner'] ===
                StakeProgram.programId.toString() &&
              inst.parsed['info']['source'] === publicKey.toString()
            ) {
              const stakeAccount = inst.parsed['info']['newAccount'];
              stakeAccounts.push(new PublicKey(stakeAccount));
              debugger;
            }
          } catch (e) {}
        }
      }
    }
    // 3. Ni=ow we can query state for each Stake Account
    for (let i = 0; i < stakeAccounts.length; i++) {
      try {
        const account = await connection.getAccountInfo(stakeAccounts[i]);
        console.log(`Stake account: ${account}`);
        const status = await connection.getStakeActivation(stakeAccounts[i]);
        console.log(`Stake account status: ${status.state}`);
        notify(
          'info',
          `Stake account ${stakeAccounts[i].toString()} status: ${
            status.state
          } amount: ${account?.lamports}`,
        );
      } catch (e) {}
    }
  }, [sdk, notify, wallet, publicKey, connection]);

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      disabled={!publicKey}
    >
      Get Stake Accounts bound to this wallet address (testnet)
    </Button>
  );
};

export default GetStakeAccountInfo;
