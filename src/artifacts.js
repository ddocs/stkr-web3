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
    address: '0x49E30ff1a6c7D475df145D2E89ba7F132823FCB4'
  },
  Auctions: {
    abi: Auctions.abi,
    address: ''
  },
  Staking: {
    abi: Staking.abi,
    address: '0xC399EF521d8126a617e120b38f65792cE6175024'
  },
  AETH: {
    abi: AETH.abi,
    address: '0x12Bc974D7237a959aF99d1ea1880D0da087e67Ff'
  },
  Governance: {
    abi: Governance.abi,
    address: '0x59996f3BebDE610Ba4842f772092Eb70a684891f'
  },
  Micropool: {
    abi: MicroPool.abi,
    address: '0xDE89A016C94CdE0c8C4877b957F448f38e4D3BFc'
  },
  ANKR: {
    abi: ANKR.abi,
    address: '0x3abc17C411aDAFf9ec2191D47A273bD32D83561a'
  },
  Node: {
    abi: Node.abi,
    address: '0x88E5BAF59c28cb39928119719FaaCf509fa3e581'
  }
}
