import Provider from './contracts/Provider.json'
import AETH from './contracts/AETH.json'
import ANKR from './contracts/ANKR.json'
import Governance from './contracts/Governance.json'
import Staking from './contracts/Staking.json'
import MicroPool from './contracts/MicroPool.json'

// TODO: Implement drizzle asap

// ropsten
// const network = 3

// goerli
const network = 5

// local
// const network = 5777

// {
//   ankrContract: '0xC7d62db4f4c37698adB91FE0f8b4068608a69BD1',
//   micropoolContract: '0x162D1B380A6Bd70bF71B65909814A208bda4C74e',
//   providerContract: '0x54F1Aeab81f6Fdd2D6b6517D4ABc09fbEbDAA193',
//   stakingContract: '0xbED3fA9e5ff18df1dac985cC30522dbB042c9244',
//   governanceContract: '0xFdf471232B45cA27005c914c277dA207843A3CA9',
//   AETHContract: '0xD1E2627f3Df3825101fA729155B70DcA3c094c96'
// }

// export default {
//   Provider: {
//     abi: Provider.abi,
//     address: "0x54F1Aeab81f6Fdd2D6b6517D4ABc09fbEbDAA193"
//   },
//   Staking: {
//     abi: Staking.abi,
//     address: "0xbED3fA9e5ff18df1dac985cC30522dbB042c9244"
//   },
//   AETH: {
//     abi: AETH.abi,
//     address: "0xD1E2627f3Df3825101fA729155B70DcA3c094c96"
//   },
//   Governance: {
//     abi: Governance.abi,
//     address: "0xFdf471232B45cA27005c914c277dA207843A3CA9"
//   },
//   Micropool: {
//     abi: MicroPool.abi,
//     address: "0x162D1B380A6Bd70bF71B65909814A208bda4C74e"
//   },
//   ANKR: {
//     abi: ANKR.abi,
//     address: "0xC7d62db4f4c37698adB91FE0f8b4068608a69BD1"
//   }
// }


export default {
  Provider: {
    abi: Provider.abi,
    address: Provider.networks[network].address
  },
  Staking: {
    abi: Staking.abi,
    address: Staking.networks[network].address
  },
  AETH: {
    abi: AETH.abi,
    address: AETH.networks[network].address
  },
  Governance: {
    abi: Governance.abi,
    address: Governance.networks[network].address
  },
  Micropool: {
    abi: MicroPool.abi,
    address: MicroPool.networks[network].address
  },
  ANKR: {
    abi: ANKR.abi,
    address: ANKR.networks[network].address
  }
}
