STKR JSSDK
==========

This sdk used to implement stkr.io to javascript applications. 

## Installation

Via npm;

```
npm install @ankr/stkr-jssdk
```

Via yarn;

```
yarn add @ankr/stkr-jssdk
```

## Usage

Stkr sdk constructor gets web3 instance and network name (e.g. mainnet or goerli) and act like a bridge to 
contract with web3. And return types almost same with web3 contract calls but
they may be changed / edited to provide simplicity for applications.

```js
import { Stkr } from "@ankr/stkr-jssdk"
import Web3 from "web3"

const web3 = new Web3("https://eth-api.ankr.com")
const stkr = new Stkr(web3, "goerli")
```

### Functions 

For web3 *send* functions, our custom functions gets SendOption interface from web3.

> Make sure sending values with this interface.

```ts
interface SendOptions {
    from: string;
    gasPrice?: string;
    gas?: number;
    value?: number | string | BN;
}
```

#### claimableBalanceOf(address: string)
Returns claimable aETH balance of given user

```js
const claimableBalance = await stkr.claimableBalanceOf(web3.defaultAddress)
```

#### aETHPrice()
Returns current aETH price based on Ethereum

```js
const price = await stkr.aETHPrice()
```

#### stake()

Stake eth for user.

```ts
await stkr.stake(options: SendOptions)
```

#### unstake()

Stake eth for user.

```ts
await stkr.stake(options: SendOptions)
```

