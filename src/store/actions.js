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

  async login ({ commit }) {
    if (window.web3) {
      // eslint-disable-next-line no-undef
      await window.ethereum.enable()
      window.web3 = new Web3(window.web3.currentProvider)
      window.web3.eth.defaultAccount = window.ethereum.selectedAddress
    } else {
      alert('Please install MetaMask to use this dApp!')
    }

    commit('UPDATE_USER_INFO', { displayName: window.ethereum.selectedAddress })
  },

  async allowance ({ commit }, amount) {
    const provider = await new window.web3.Contract(artifacts.ANKR.abi, artifacts.ANKR.address)

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
  }
}

export default actions
