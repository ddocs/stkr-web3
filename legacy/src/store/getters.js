/*=========================================================================================
  File Name: getters.js
  Description: Vuex Store - getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// added so later we can keep breakpoint in sync automatically using this config file
// import tailwindConfig from "../../tailwind.config.js"

import Web3 from 'web3'

const getters = {

  // COMPONENT
  // vx-autosuggest
  // starredPages: state => state.navbarSearchAndPinList.data.filter((page) => page.highlightAction),
  windowBreakPoint: state => {

    // This should be same as tailwind. So, it stays in sync with tailwind utility classes
    if (state.windowWidth >= 1200) return 'xl'
    else if (state.windowWidth >= 992) return 'lg'
    else if (state.windowWidth >= 768) return 'md'
    else if (state.windowWidth >= 576) return 'sm'
    else return 'xs'
  },

  scrollbarTag: state => {
    return state.is_touch_device ? 'div' : 'VuePerfectScrollbar'
  },

  ethEnabled: async () => {
    if (window.web3) {
      // eslint-disable-next-line no-undef
      window.web3 = new Web3(window.web3.currentProvider)
      await window.ethereum.enable()
      return true
    }
    return false
  },

  pendingProviders: state => {
    return state.providers.filter(provider => provider.status === 'PENDING')
  },

  appliedProviders: state => {
    return state.providers.filter(provider => provider.status === 'APPLIED')
  },

  userIsProvider(state) {
    return Boolean(state.AppActiveUser.providerInfo && state.AppActiveUser.providerInfo.addr)
  }
}


export default getters
