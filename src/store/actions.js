/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Web3 from 'web3'
import artifacts from '@/artifacts'

const actions = {

  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  updateVerticalNavMenuWidth ({ commit }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },

  // VxAutoSuggest
  updateStarredPage ({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  // The Navbar
  arrangeStarredPagesLimited ({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore ({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay ({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY')
  },
  updateTheme ({ commit }, val) {
    commit('UPDATE_THEME', val)
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo ({ commit }, payload) {
    commit('UPDATE_USER_INFO', payload)
  },

  async login ({ commit, dispatch }) {
    if (window.web3) {
      // eslint-disable-next-line no-undef
      await window.ethereum.enable()
      window.contracts = {}
      window.web3 = new Web3(window.web3.currentProvider)
      window.web3.eth.defaultAccount = window.ethereum.selectedAddress
      window.web3.eth.personal.defaultAccount = window.ethereum.selectedAddress
    } else {
      alert('Please install MetaMask to use this dApp!')
    }

    commit('UPDATE_USER_INFO', { displayName: window.ethereum.selectedAddress })
    dispatch('getProviders')
    dispatch('stakeStats')
  },

  async allowance ({ commit }, amount) {
    const provider = await new window.web3.Contract(artifacts.ANKR.abi, artifacts.ANKR.address, {from: window.ethereum.selectedAddress})

    provider.allowance(artifacts.Staking.address, window.web3.utils.toWei(amount)).send()
  },

  async updatePools ({ commit }) {

    // if (state.pools.length && !force) return true

    const pools = [
      {
        name: 'Ankr Pool 3',
        provider: 'Ankr',
        status: 'Pending',
        totalStake: 12,
        fee: 10
      },
      {
        name: 'Ankr Pool 2',
        provider: 'Ankr',
        status: 'Pending',
        totalStake: 30,
        reward: 0,
        fee: 10
      },
      {
        name: 'Ankr Pool 1',
        provider: 'Ankr',
        status: 'Ongoing',
        totalStake: 32,
        reward: 1,
        fee: 10
      }
    ]

    commit('UPDATE_POOLS', pools)
  },

  async stakeStats({commit, dispatch}) {
    const stakingContract = await dispatch('getContract', 'Staking')
    const ankrContract = await dispatch('getContract', 'ANKR')
    const userTotal = await stakingContract.methods.totalStakes().call()
    window.ankr = ankrContract
    window.staking = stakingContract
    const total = await ankrContract.methods.balanceOf(stakingContract._address).call()
    commit('UPDATE_STAKE_STATS', {
      userTotal, total
    })
  },

  async getProviders({commit, dispatch}) {
    const providerContract = await dispatch('getContract', 'Provider')
    const stakingContract = await dispatch('getContract', 'Staking')
    const appliedEvents = await providerContract.getPastEvents('Applied');
    const statusChangeEvents = await providerContract.getPastEvents('StatusChanged');
    const providers = []
    for (const event of appliedEvents) {
      const data = {}

      if (await providerContract.methods.isProvider(await event.returnValues.provider).call())
        continue;

      providers.push({
        address: await event.returnValues.provider,
        stakes: await stakingContract.methods._stakes(event.returnValues.provider).call(),
        status: 'PENDING'
      })
    }

    for (const event of statusChangeEvents) {
      const data = {}
      providers.push({
        address: await event.returnValues.provider,
        stakes: await stakingContract.methods._stakes(event.returnValues.provider).call(),
        status: 'APPLIED'
      })

    }

    console.log(providers)
    commit('UPDATE_PROVIDERS', providers)
  },

  async getContract ({ commit }, contract) {
    const contractData = new window.web3.eth.Contract(artifacts[contract].abi, artifacts[contract].address, { from: window.ethereum.selectedAddress });
    window.contracts[contract] = contractData
    return contractData
  },

  async approveProvider({commit, dispatch}, providerAddress) {
    const contract = await dispatch('getContract', 'Provider')
    await contract.methods.approve(providerAddress).send()
    await dispatch('getProviders')
  },

  async getMicropools({commit}) {
    const contract = await dispatch('getContract', 'Micropool')

  }
}

export default actions
