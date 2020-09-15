import Provider from '../../build/contracts/Provider.json'
import Auctions from '../../build/contracts/Auctions.json'
import AETH from '../../build/contracts/AETH.json'
import ANKR from '../../build/contracts/ANKR.json'
import Governance from '../../build/contracts/Governance.json'
import Staking from '../../build/contracts/Staking.json'

// TODO: Implement drizzle asap

export default {
  Provider: {
    abi: Provider.abi,
    address: '0xcC5dd115Dfe5CEE3d6269bdD67D9Fa496C513905'
  },
  Auctions: {
    abi: Auctions.abi,
    address: ''
  },
  Staking: {
    abi: Staking.abi,
    address: '0x350794FeaC8b5aAf154AE1b483AED0E9890F9AD7'
  },
  AETH: {
    abi: Staking.abi,
    address: '0xA39A1D9aF7d3Caad525e9729824D0927f85F25e1'
  },
  Governance: {
    abi: Governance.abi,
    address: ''
  },
  Micropool: {
    abi: Staking.abi,
    address: '0xc8871904883eD5e271a15770CA7755b989CC897c'
  },
  ANKR: {
    abi: ANKR.abi,
    address: '0xdF533bA9937819f166fa1C4788364d0DAcF4eD12'
  }
}
