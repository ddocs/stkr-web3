import Web3 from 'web3'
import { bytesToHex, numberToHex } from 'web3-utils'
import { JsonRpcResponse } from 'web3-core-helpers/types'
import { KeyProvider, ProviderConfig, SendOptions } from './provider'

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

interface ProviderMessage {
  type: string;
  data: unknown;
}

export class MetaMaskProvider extends KeyProvider {
  static hasInPageSupport() {
    // @ts-ignore
    return !!window.ethereum || !!window.web3
  }

  constructor(providerConfig: ProviderConfig) {
    super(providerConfig)
  }

  private async unlockAccounts(ethereum: any): Promise<string[]> {
    let unlockedAccounts: string[] = []
    try {
      const { result } = await ethereum.send('eth_requestAccounts')
      unlockedAccounts = result
    } catch (error) {
      console.error(error)
      throw new Error('User denied access to account')
    }
    console.log(`unlocked metamask accounts: ${unlockedAccounts}`)
    if (!unlockedAccounts.length || !unlockedAccounts[0]) {
      throw new Error('Unable to detect unlocked MetaMask account')
    }
    this._currentAccount = unlockedAccounts[0]
    console.log(`current account is ${this._currentAccount}`)
    return unlockedAccounts
  }

  async connect(): Promise<void> {
    // @ts-ignore
    let ethereum: any = typeof window !== 'undefined' && window.ethereum
    // @ts-ignore
    let web3: any = typeof window !== 'undefined' && window.web3
    if (ethereum) {
      web3 = new Web3(ethereum)
      if (Number(ethereum.networkVersion) !== Number(this.providerConfig.networkId)) {
        console.error(
          `ethereum networks mismatched ${ethereum.networkVersion} != ${this.providerConfig.networkId}`
        )
        /*throw new Error('MetaMask ethereum network mismatched, please check your MetaMask network.')*/
      }
      await this.unlockAccounts(ethereum)
      ethereum.on('accountsChanged', (accounts: string[]) => {
        let newAccount: string | null = null
        if (accounts.length > 0) {
          newAccount = accounts[0]
        }
        if (newAccount?.toLowerCase() !== this._currentAccount?.toLowerCase()) {
          console.log(
            `You\'ve changed MetaMask account, reloading page (${this._currentAccount} != ${newAccount})`
          )
          window.location.reload()
        }
      })
      ethereum.on('message', (message: ProviderMessage) => {
        console.log(`message from MetaMask: ${JSON.stringify(message)}`)
      })
      ethereum.on('chainChanged', (chainId: string) => {
        console.log(`detected MetMask chainId change to ${chainId}`)
        window.location.reload()
      })
      ethereum.autoRefreshOnNetworkChange = false
    } else if (web3) {
      /* there several providers that emulates MetaMask behavior */
      /*const {isMetaMask} = window.web3.currentProvider;
      if (isMetaMask !== true) {
        throw new Error('Invalid MetaMask configuration provided');
      }*/
      web3 = new Web3(web3.currentProvider)
      if (!web3 || (web3.isConnected && !web3.isConnected())) {
        throw new Error('Invalid MetaMask configuration provided')
      }
    } else {
      web3 = new Web3()
      if (!web3 || (web3.isConnected && !web3.isConnected())) {
        throw new Error('Invalid MetaMask configuration provided')
      }
      // throw new Error('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    this._web3 = web3
    return web3
  }

  close(): Promise<void> {
    return Promise.resolve()
  }

  async findAccounts(): Promise<string[]> {
    return this._currentAccount ? [this._currentAccount] : []
  }

  async sign(data: Buffer | string | object, address: string): Promise<string> {
    if (!this._web3) throw new Error('Web3 must be initialized')
    try {
      if (typeof data === 'object') {
        // @ts-ignore
        data = bytesToHex(data)
      }
      return this._web3.eth.personal.sign(
        data,
        address,
        '',
        (error: Error, signature: string) => {
        }
      )
    } catch (e) {
      console.error(e)
      const message = e.message.substr(0, e.message.indexOf('\n')),
        parts = message.split(':')
      /* try to detect angry MetaMask messages */
      if (parts.length > 0) {
        /* special case for Firefox that doesn't return any errors, only extension stack trace */
        if (message.includes('@moz-extension') && message.includes('Returned error: value')) {
          throw new Error('User denied message signature.')
        }
        /* cases for other browsers (tested in Chrome, Opera, Brave) */
        if (
          message.includes('MetaMask') ||
          message.includes('Returned error') ||
          message.includes('RPC Error')
        ) {
          throw new Error(parts[parts.length - 1])
        }
      }
      throw e
    }
  }

  async invoke(from: string, to: string, sendOptions: SendOptions): Promise<JsonRpcResponse> {
    const tx = {
      chainId: numberToHex(this.providerConfig.chainId),
      data: sendOptions.data,
      value: numberToHex(sendOptions.value || '0'),
      from: from,
      to: to
    }
    console.log('Calling transaction via Web3: ', tx)
    // @ts-ignore
    return await this._web3?.currentProvider?.request({
      method: 'eth_sendTransaction',
      params: [tx],
      from: from
    })
  }

  async send(from: string, to: string, sendOptions: SendOptions): Promise<JsonRpcResponse> {
    const gasPrice = await this._web3?.eth.getGasPrice()
    console.log('Gas Price: ' + gasPrice)
    const nonce = await this._web3?.eth.getTransactionCount(from)
    console.log('Nonce: ' + nonce)
    const tx = {
      chainId: numberToHex(this.providerConfig.chainId),
      data: sendOptions.data,
      value: numberToHex(sendOptions.value || '0'),
      from: from,
      to: to,
      gas: numberToHex(sendOptions.gasLimit || '200000')
    }
    return new Promise(async (resolve, reject) => {
      console.log('Sending transaction via Web3: ', tx)
      // @ts-ignore
      this._web3?.currentProvider?.sendAsync(
        {
          method: 'eth_sendTransaction',
          params: [tx],
          from: from
        },
        (error: Error, result: JsonRpcResponse) => {
          const { error: error2 } = result
          if (error2) {
            reject(error2)
            return
          } else if (error) {
            reject(error)
            return
          }
          resolve(result)
        },
        (error: any) => {
          console.error(error)
        }
      )
    })
  }
}
