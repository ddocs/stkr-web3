import Provider from './contracts/Provider.json'
import Auctions from './contracts/Auctions.json'
import AETH from './contracts/AETH.json'
import ANKR from './contracts/ANKR.json'
import Governance from './contracts/Governance.json'
import Staking from './contracts/Staking.json'
import Node from './contracts/Node.json'
import MicroPool from './contracts/MicroPool.json'

// TODO: Implement drizzle asap

export default {
  Provider: {
    abi: Provider.abi,
    address: '0xC9B554198D8bf8511bC76cBa0FB2e7d747637d97'
  },
  Auctions: {
    abi: Auctions.abi,
    address: ''
  },
  Staking: {
    abi: Staking.abi,
    address: '0x77062aa2ea21dDe267AB06e39F2B2BFB7a5B8eC9'
  },
  AETH: {
    abi: AETH.abi,
    address: '0x791DcF7011ddF4F56d6D136F9C8a2eE57C531bd4'
  },
  Governance: {
    abi: Governance.abi,
    address: '0x7bAc682E5269485a7e21835041016623306B5f50'
  },
  Micropool: {
    abi: MicroPool.abi,
    address: '0x12831656aD8A00F1d02eF377D7a58cf1bAe3a982'
  },
  ANKR: {
    abi: ANKR.abi,
    address: '0x6fa1B565F7E9C1490deBD57971cd8405C95749d7'
  },
  Node: {
    abi: Node.abi,
    address: '0xaaE82b78C159765aFdFfd69eCbf3a15D338B82C4'
  }
}
