import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SendOptions,
  Signer,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';

import { Wallet } from '@solana/wallet-adapter-wallets';
import { WalletError } from '@solana/wallet-adapter-base';

export interface SendTransactionOptions extends SendOptions {
  signers?: Signer[];
}

export class SolanaDirectStakingSdk {
  public static initWithProvider(): SolanaDirectStakingSdk {
    return new SolanaDirectStakingSdk();
  }

  private constructor() {
    // const { connection } = useConnection();
    // const { publicKey, sendTransaction } = useWallet();
    // let currentContract: Contract | undefined = undefined,
    //   currentContractAddress: string | undefined = undefined;
    //   for (const [key, value] of Object.entries(configMap)) {
    //     const contract = new web3.eth.Contract(
    //       ABI_AVALANCHE_POOL as any,
    //       value.AvalanchePool,
    //     );
    //     if (String(chainId) === key) {
    //       currentContract = contract;
    //       currentContractAddress = value.AvalanchePool;
    //     }
    //   }
    //   if (!currentContract || !currentContractAddress) {
    //     throw new Error(`CrossChain is not supported by current chain`);
    //   }
    //   this.currentContractAddress = currentContractAddress;
    //   this.currentContract = currentContract;
  }

  async sendTransaction(
    signTransaction: (transaction: Transaction) => Promise<Transaction>,
    wallet: Wallet,
    publicKey: PublicKey,
    transaction: Transaction,
    connection: Connection,
    options: SendTransactionOptions = {},
  ): Promise<TransactionSignature> {
    try {
      transaction.feePayer = transaction.feePayer || publicKey || undefined;
      transaction.recentBlockhash =
        transaction.recentBlockhash ||
        (await connection.getRecentBlockhash('max')).blockhash;

      const { signers, ...sendOptions } = options;

      signers?.length && transaction.partialSign(...signers);
      debugger;

      transaction = await signTransaction(transaction);
      const rawTransaction = transaction.serialize();

      return await connection.sendRawTransaction(rawTransaction, sendOptions);
    } catch (error) {
      // if (!(error instanceof WalletError)) {
      //   error = new WalletSendTransactionError(error.message, error);
      // }
      wallet.adapter().emit('error', error);
      throw error;
    }
  }

  public async airdrop(
    publicKey: PublicKey | null,
    connection: Connection,
    notify: (...args: any[]) => any,
  ): Promise<string> {
    if (!publicKey) {
      return Promise.reject(new Error('Wallet not connected!'));
    }

    let signature: TransactionSignature = '';
    try {
      signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
      notify('info', 'Airdrop requested:', signature);

      await connection.confirmTransaction(signature);
      notify('success', 'Airdrop successful!', signature);
    } catch (error) {
      notify('error', `Airdrop failed! ${error.message}`, signature);
    }
    return new Promise<string>(resolve => {
      return signature;
    });
  }
}
