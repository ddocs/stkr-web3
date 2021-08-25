import * as React from 'react';
import { FC, useCallback, useMemo } from 'react';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { ConnectionProvider } from './ConnectionProvider';
import { SdkProvider } from './SdkProvider';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletError } from '@solana/wallet-adapter-base';
import {
  WalletConnectButton as MaterialUIWalletConnectButton,
  WalletDialogButton as MaterialUIWalletDialogButton,
  WalletDialogProvider as MaterialUIWalletDialogProvider,
  WalletDisconnectButton as MaterialUIWalletDisconnectButton,
} from '@solana/wallet-adapter-material-ui';
import {
  getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolflareWebWallet,
  getSolletWallet,
  getSolongWallet,
  getTorusWallet,
} from '@solana/wallet-adapter-wallets';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { deepPurple, pink } from '@material-ui/core/colors';
import RequestAirdrop from './AirdropExample';
import SendCoins from './SendCoinsExample';
import CreateStakeAccountAndStake from './CreateStakeAccountExample';
import GetStakeAccountInfo from './GetStakeAccountInfoExample';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: deepPurple[700],
    },
    secondary: {
      main: pink[700],
    },
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: 'flex-start',
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: '12px 16px',
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
    },
  },
});

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

export const Solana: FC = () => {
  const endpoint = useMemo(() => clusterApiUrl('testnet'), []);
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getTorusWallet({
        options: {
          clientId:
            'BOM5Cl7PXgE9Ylq1Z1tqzhpydY0RVr8k90QQ85N7AKI5QGSrr9iDC-3rvmy0K_hF0JfpLMiXoDhta68JwcxS1LQ',
        },
      }),
      getLedgerWallet(),
      getSolongWallet(),
      getMathWallet(),
      getSolletWallet(),
      getSolflareWebWallet(),
    ],
    [],
  );
  const styles = useStyles();
  // const { enqueueSnackbar } = useSnackbar();

  const onError = useCallback(
    (error: WalletError) => {
      // enqueueSnackbar(error.message ? `${error.name}: ${error.message}` : error.name, { variant: 'error' });
      console.error(error);
    },
    [],
    // [enqueueSnackbar]
  );

  // const fn1 = useCallback(async () => {
  //   const { connection } = useConnection();
  //   const { publicKey } = useWallet();
  //   const tx = await solanaSdk.stake(
  //     publicKey,
  //     connection,
  //     notify,
  //     '1', // 1 STL
  //   );
  //   console.log(tx);
  //   // txHash = tx.transactionHash;
  //   // console.log(txHash);
  // }, [notify]);
  //
  // const fn2 = useCallback(async () => {
  //   const { connection } = useConnection();
  //   const { publicKey } = useWallet();
  //   const tx = await solanaSdk.unstake(
  //     publicKey,
  //     connection,
  //     notify,
  //     '1', // 1 STL
  //   );
  //   console.log(tx);
  //   // txHash = tx.transactionHash;
  //   // console.log(txHash);
  // }, [notify]);
  //
  // const fn3 = useCallback(async () => {
  //   const { connection } = useConnection();
  //   const { publicKey } = useWallet();
  //   const tx = await solanaSdk.transfer(
  //     publicKey,
  //     connection,
  //     notify,
  //     '1', // 1 STL
  //     ''
  //   );
  //   console.log(tx);
  //   // txHash = tx.transactionHash;
  //   // console.log(txHash);
  // }, [notify]);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider
            wallets={wallets}
            onError={onError}
            autoConnect={false}
          >
            <SdkProvider>
              <h1>
                Here is a simple example illustrating connection to the one of
                wallets supporting Solana{' '}
              </h1>
              <MaterialUIWalletDialogProvider>
                <MaterialUIWalletDialogButton />
                <MaterialUIWalletConnectButton />
                <MaterialUIWalletDisconnectButton />
              </MaterialUIWalletDialogProvider>
              <h1>
                Here is a simple example illustrating Staking on Solana (node id
                is fixed){' '}
              </h1>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <RequestAirdrop />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SendCoins />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <GetStakeAccountInfo />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <CreateStakeAccountAndStake />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/*<button onClick={fn1}>Stake 1 STL</button>*/}
              {/*<button onClick={fn2}>Unstake 1 STL</button>*/}
              {/*<button onClick={fn3}>Transfer unstaked 1 STL</button>*/}
            </SdkProvider>
          </WalletProvider>
        </ConnectionProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
