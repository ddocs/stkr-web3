/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Web3 from "web3";
import artifacts from "@/artifacts";

const actions = {
  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  updateVerticalNavMenuWidth({ commit }, width) {
    commit("UPDATE_VERTICAL_NAV_MENU_WIDTH", width);
  },

  // VxAutoSuggest
  updateStarredPage({ commit }, payload) {
    commit("UPDATE_STARRED_PAGE", payload);
  },

  // The Navbar
  arrangeStarredPagesLimited({ commit }, list) {
    commit("ARRANGE_STARRED_PAGES_LIMITED", list);
  },
  arrangeStarredPagesMore({ commit }, list) {
    commit("ARRANGE_STARRED_PAGES_MORE", list);
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay({ commit }) {
    commit("TOGGLE_CONTENT_OVERLAY");
  },
  updateTheme({ commit }, val) {
    commit("UPDATE_THEME", val);
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  async updateUserInfo ({commit, dispatch}) {
    const providerContract = await dispatch('getContract', 'Provider')
    const payload = {
      displayName: window.ethereum.selectedAddress,
      providerInfo: {}
    }
    const info = await providerContract.methods.getProviderInfo(window.ethereum.selectedAddress).call()
    window.provider = providerContract
    if (String(info.addr).toLowerCase() == String(window.ethereum.selectedAddress).toLowerCase()) {
      console.log("info", info)
      payload.providerInfo = {
        addr: info.addr,
        email: web3.utils.hexToAscii(info.email),
        name: web3.utils.hexToAscii(info.name),
        iconUrl: web3.utils.hexToAscii(info.iconUrl),
        status: Number(info.status) === 0 ? 'Active' : 'Blocked',
      }
    }

    commit('UPDATE_USER_INFO', payload)
  },

  async login({ commit, dispatch }) {
    if (window.web3) {
      // eslint-disable-next-line no-undef
      await window.ethereum.enable();
      window.contracts = {};
      window.web3 = new Web3(window.web3.currentProvider);
      window.web3.eth.defaultAccount = window.ethereum.selectedAddress;
      window.web3.eth.personal.defaultAccount = window.ethereum.selectedAddress;
    } else {
      alert("Please install MetaMask to use this dApp!");
    }
    console.log("here")
    dispatch('updateUserInfo')
    dispatch('getMicropools')
    dispatch('getProviders')
    dispatch('getStakeStats')
  },

  async allowance({ commit }, amount) {
    const provider = await new window.web3.Contract(
      artifacts.ANKR.abi,
      artifacts.ANKR.address,
      { from: window.ethereum.selectedAddress }
    );

    provider
      .allowance(artifacts.Staking.address, window.web3.utils.toWei(amount))
      .send();
  },

  async getStakeStats ({commit, dispatch}) {
    const stakingContract = await dispatch('getContract', 'Staking')
    const ankrContract = await dispatch('getContract', 'ANKR')
    const userTotal = await stakingContract.methods.totalStakes().call()
    const total = await ankrContract.methods.balanceOf(stakingContract._address).call()
    commit('UPDATE_STAKE_STATS', {
      userTotal,
      total
    });
  },

  async getProviders ({commit, dispatch}) {
    const providerContract = await dispatch('getContract', 'Provider')
    const stakingContract = await dispatch('getContract', 'Staking')
    window.provider = providerContract
    
    const appliedEvents = await providerContract.getPastEvents('Applied', {fromBlock: 0})

    const statusChangeEvents = await providerContract.getPastEvents('StatusChanged', {fromBlock: 0})
    const providers = []
    for (const event of appliedEvents) {
      const data = {}
      // TODO: this will be taken from backend
      const provider = await event.returnValues.provider;
      const info = await providerContract.methods.getProviderInfo(provider).call()
      
      providers.push({
        name: web3.utils.hexToAscii(info.name),
        address: provider,
        stakes: await stakingContract.methods._stakes(event.returnValues.provider).call(),
        status: Number(info.status) === 0 ? 'Active' : 'Blocked'
      })
    }
    commit('UPDATE_PROVIDERS', providers)
  },

  async getContract ({commit, dispatch}, contract) {
    // const infura = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/167ee585da3c42e4a2a9c42476f9000f'));
    let contractData = new window.web3.eth.Contract(artifacts[contract].abi, artifacts[contract].address, {from: window.ethereum.selectedAddress})
    window.contracts[contract] = contractData
    return contractData
  },

  async getContract({ commit, dispatch }, contract) {
    // const infura = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/167ee585da3c42e4a2a9c42476f9000f'));
    let contractData = new window.web3.eth.Contract(
      artifacts[contract].abi,
      artifacts[contract].address,
      { from: window.ethereum.selectedAddress }
    );
    window.contracts[contract] = contractData;
    return contractData;
  },

  async getMicropools ({commit, dispatch}) {
    const contract = await dispatch('getContract', 'Micropool')
    const poolEvents = await contract.getPastEvents('PoolCreated', {fromBlock: 0})
    window.micropool = contract
    const pools = []
    for (const event of poolEvents) {
      const data = {}
      // TODO: this will be taken from backend
      const index = await event.returnValues.poolIndex;
      const info = await contract.methods.poolDetails(index).call()
      
      info.stakeable = Number(info.status) === 0
      info.name = web3.utils.hexToAscii(info.name)
      info.poolIndex = index
      info.totalStakedAmount = web3.utils.fromWei(info.totalStakedAmount + '')
      pools.push(info)
    }
    commit('UPDATE_POOLS', pools)
  }
};

export default actions;
