import Provider from '../../build/contracts/Provider.json'
import Auctions from '../../build/contracts/Auctions.json'
import AETH from '../../build/contracts/AETH.json'
import ANKR from '../../build/contracts/ANKR.json'
import Governance from '../../build/contracts/Governance.json'
import Staking from '../../build/contracts/Staking.json'
import Node from '../../build/contracts/Node.json'

// TODO: Implement drizzle asap

export default {
  Provider: {
    abi: Provider.abi,
    address: '0x6adfc53D2A0356b18803A92909E93D5A978Be080'
  },
  Auctions: {
    abi: Auctions.abi,
    address: ''
  },
  Staking: {
    abi: Staking.abi,
    address: '0xE85F4aa42B71E5D64f6E0Bb8df46Bb1d7eB5DE85'
  },
  AETH: {
    abi: AETH.abi,
    address: '0xde24f229760dC5E17F1e452F34563fEC9295BD18'
  },
  Governance: {
    abi: Governance.abi,
    address: ''
  },
  Micropool: {
    abi: Staking.abi,
    address: '0x3f4b33F71709693B9b0ce007b6ddC093eC0f61C6'
  },
  ANKR: {
    abi: ANKR.abi,
    address: '0x0543891EDe8b2d54bED2FdD411B9EE2e6a2C207D'
  },
  Node: {
    abi: Node.abi,
    address: '0xD4b44aF478083839c4906b8c7FA2d3a4912093Db'
  }
}
