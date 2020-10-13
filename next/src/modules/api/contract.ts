import { KeyProvider } from './provider'
import { Contract } from 'web3-eth-contract'
import { stringToHex } from 'web3-utils'

const ABI_MICRO_POOL = require('./contract/MicroPool.json')

export interface ContractConfig {
  microPoolContract: string
  ankrContract: string
}

export class ContractManager {
  private microPoolContract: Contract

  constructor(private keyProvider: KeyProvider, private contractConfig: ContractConfig) {
    this.microPoolContract = this.keyProvider.createContract(
      ABI_MICRO_POOL,
      contractConfig.microPoolContract
    )
  }

  async initializePool(name: string): Promise<string> {
    const encodedName = stringToHex(name)
    if (encodedName.length > 32) {
      throw new Error('Encoded pool name can\'t be greater than 32 bytes')
    }
    const data: string = this.microPoolContract.methods
      .initializePool(encodedName)
      .encodeABI()
    console.log(`encoded [initializePool] ABI: ${data}`)
    const currentAccount = await this.keyProvider.currentAccount()
    const receipt = await this.keyProvider.send(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data
      }
    )
    return receipt.result
  }

  async poolDetails(poolIndex: string): Promise<any> {
    const encodedPoolIndex = stringToHex(poolIndex)
    const data: string = this.microPoolContract.methods
      .poolDetails(encodedPoolIndex)
      .encodeABI()
    console.log(`encoded [initializePool] ABI: ${data}`)
    const currentAccount = await this.keyProvider.currentAccount()
    const receipt = await this.keyProvider.invoke(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data
      }
    )
    return receipt.result
  }

  async stake(poolIndex: number): Promise<string> {
    const data: string = this.microPoolContract.methods.stake(poolIndex).encodeABI()
    const currentAccount = await this.keyProvider.currentAccount()
    const receipt = await this.keyProvider.send(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data
      }
    )
    return receipt.result
  }

  async unstake(poolIndex: number): Promise<string> {
    const data: string = this.microPoolContract.methods.unstake(poolIndex).encodeABI()
    const currentAccount = await this.keyProvider.currentAccount()
    const receipt = await this.keyProvider.send(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data
      }
    )
    return receipt.result
  }
}
