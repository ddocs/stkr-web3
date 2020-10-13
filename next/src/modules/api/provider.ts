import { JsonRpcResponse } from 'web3-core-helpers/types'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { Contract } from 'web3-eth-contract'

export interface ProviderConfig {
  networkId: string
  chainId: string
}

export interface SendOptions {
  data?: string
  gasLimit?: string
  value?: string
}

export abstract class KeyProvider {
  protected _currentAccount: string | null = null
  protected _web3: Web3 | null = null

  protected constructor(protected providerConfig: ProviderConfig) {}

  createContract(abi: AbiItem[] | AbiItem, address: string): Contract {
    if (!this._web3) throw new Error('Web3 must be initialized')
    return new this._web3.eth.Contract(abi, address)
  }

  abstract connect(): Promise<void>

  abstract close(): Promise<void>

  currentAccount(): string {
    if (!this._currentAccount) throw new Error('MetaMask is not activated');
    return this._currentAccount;
  }

  currentChain(): string {
    return this.providerConfig.chainId;
  }

  currentNetwork(): string {
    return this.providerConfig.networkId;
  }

  abstract findAccounts(): Promise<string[]>

  async isGranted(address: string | undefined = undefined) {
    const accounts = await this.findAccounts()
    if (!Array.isArray(accounts)) {
      throw new Error('Accounts should have array type')
    } else if (address === undefined) {
      return accounts.length > 0
    }
    return accounts.indexOf(address) >= 0
  }

  abstract sign(data: Buffer | string | object, address: string): Promise<string>

  abstract invoke(from: string, to: string, sendOptions: SendOptions): Promise<JsonRpcResponse>

  abstract send(from: string, to: string, sendOptions: SendOptions): Promise<JsonRpcResponse>
}
