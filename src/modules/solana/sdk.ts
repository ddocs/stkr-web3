import {
  Authorized,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SendOptions,
  Signer,
  StakeProgram,
  SystemProgram,
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

      transaction = await signTransaction(transaction);
      debugger;
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
    publicKey: PublicKey,
    connection: Connection,
    notify: (...args: any[]) => any,
  ): Promise<string> {
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

  public async sendSol(
    fromPublicKey: PublicKey,
    toPubkey: PublicKey,
    amount: number,
    connection: Connection,
    wallet: Wallet,
    signTransaction: (transaction: Transaction) => Promise<Transaction>,
    notify: (...args: any[]) => any,
  ): Promise<string> {
    let signature: TransactionSignature = '';
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromPublicKey,
          toPubkey: toPubkey,
          lamports: amount,
        }),
      );
      signature = await this.sendTransaction(
        signTransaction,
        wallet,
        fromPublicKey,
        transaction,
        connection,
      );
      notify('info', 'Transaction sent:', signature);

      await connection.confirmTransaction(signature);
      console.log(
        `SENT TX: https://explorer.solana.com/tx/${signature}?cluster=testnet`,
      );
      notify('success', 'Transaction successful!', signature);
    } catch (error) {
      notify('error', `Transaction failed! ${error.message}`, signature);
      console.log(`TRANSACTION error: ${error}`);
    }
    return signature;
  }

  public async createStakeAccountWithSeed(
    publicKey: PublicKey,
    seed: string,
    amount: number,
    nodePubkey: string,
    connection: Connection,
    wallet: Wallet,
    signTransaction: (transaction: Transaction) => Promise<Transaction>,
    notify: (...args: any[]) => any,
  ): Promise<string> {
    const authorized = new Authorized(publicKey, publicKey);
    const votePublicKey = new PublicKey(nodePubkey);
    let signature: TransactionSignature = '';
    try {
      // 1. Create stake account and put 1.5 SOL there
      const stakeAccountPublicKey = await PublicKey.createWithSeed(
        publicKey,
        seed,
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
      // 3. Do the stake
      transaction.add(
        StakeProgram.delegate({
          // stakePubkey: stakeAccount.publicKey,
          stakePubkey: stakeAccountPublicKey,
          authorizedPubkey: authorized.staker,
          votePubkey: votePublicKey,
        }),
      );
      signature = await this.sendTransaction(
        signTransaction,
        wallet,
        publicKey,
        transaction,
        connection,
      );
      notify('info', 'Transaction sent:', signature);

      await connection.confirmTransaction(signature);
      console.log(`Stake account: ${stakeAccountPublicKey.toString()}`);
      console.log(
        `SENT TX: https://explorer.solana.com/tx/${signature}?cluster=testnet`,
      );
      notify('success', 'Stake transaction successful!', signature);
    } catch (error) {
      notify('error', `Stake transaction failed! ${error.message}`, signature);
      console.log(`TRANSACTION error: ${error}`);
    }
    return signature;
  }

  public async splitAccountWithSeed(
    authorityPublicKey: PublicKey,
    stakeAccountSeed: string,
    newAccountSeed: string,
    amount: number,
    connection: Connection,
    wallet: Wallet,
    signTransaction: (transaction: Transaction) => Promise<Transaction>,
    notify: (...args: any[]) => any,
  ): Promise<string> {
    let signature: TransactionSignature = '';
    try {
      const stakeAccountPublicKey = await PublicKey.createWithSeed(
        authorityPublicKey,
        stakeAccountSeed,
        StakeProgram.programId,
      );
      const splitStakeAccountPublicKey = await PublicKey.createWithSeed(
        authorityPublicKey,
        newAccountSeed,
        StakeProgram.programId,
      );
      const transaction = new Transaction().add(
        SystemProgram.createAccountWithSeed({
          fromPubkey: authorityPublicKey,
          newAccountPubkey: splitStakeAccountPublicKey,
          basePubkey: authorityPublicKey,
          seed: newAccountSeed,
          space: StakeProgram.space,
          lamports: 0,
          programId: StakeProgram.programId,
        }),
      );
      transaction.add(
        StakeProgram.split({
          stakePubkey: stakeAccountPublicKey,
          authorizedPubkey: authorityPublicKey,
          splitStakePubkey: splitStakeAccountPublicKey,
          lamports: amount,
        }),
      );
      transaction.instructions.splice(1, 1);

      signature = await this.sendTransaction(
        signTransaction,
        wallet,
        authorityPublicKey,
        transaction,
        connection,
      );
      notify('info', 'Transaction sent:', signature);

      await connection.confirmTransaction(signature);
      console.log(
        `SENT TX: https://explorer.solana.com/tx/${signature}?cluster=testnet`,
      );
      notify('success', 'Split transaction successful!', signature);
    } catch (error) {
      notify('error', `Split transaction failed! ${error.message}`, signature);
      console.log(`TRANSACTION error: ${error}`);
    }
    return signature;
  }

  public async unstakeFromAccountWithSeed(
    authorityPublicKey: PublicKey,
    stakeAccountSeed: string,
    connection: Connection,
    wallet: Wallet,
    signTransaction: (transaction: Transaction) => Promise<Transaction>,
    notify: (...args: any[]) => any,
  ): Promise<string> {
    let signature: TransactionSignature = '';
    try {
      const stakeAccountPublicKey = await PublicKey.createWithSeed(
        authorityPublicKey,
        stakeAccountSeed,
        StakeProgram.programId,
      );
      const transaction = new Transaction().add(
        StakeProgram.deactivate({
          stakePubkey: stakeAccountPublicKey,
          authorizedPubkey: authorityPublicKey,
        }),
      );
      signature = await this.sendTransaction(
        signTransaction,
        wallet,
        authorityPublicKey,
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
    }
    return signature;
  }

  public async withdrawFromAccountWithSeed(
    authorityPublicKey: PublicKey,
    stakeAccountSeed: string,
    amount: number,
    connection: Connection,
    wallet: Wallet,
    signTransaction: (transaction: Transaction) => Promise<Transaction>,
    notify: (...args: any[]) => any,
  ): Promise<string> {
    let signature: TransactionSignature = '';
    try {
      const stakeAccountPublicKey = await PublicKey.createWithSeed(
        authorityPublicKey,
        stakeAccountSeed,
        StakeProgram.programId,
      );
      const transaction = new Transaction().add(
        StakeProgram.withdraw({
          stakePubkey: stakeAccountPublicKey,
          authorizedPubkey: authorityPublicKey,
          toPubkey: authorityPublicKey,
          lamports: amount,
        }),
      );
      signature = await this.sendTransaction(
        signTransaction,
        wallet,
        authorityPublicKey,
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
    }
    return signature;
  }
}
