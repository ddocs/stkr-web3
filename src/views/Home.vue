<template>
  <div>
    <h4>You are in home.</h4>
    <vs-button color="success" @click="login" type="filled">Login</vs-button>
  </div>
</template>

<script>
export default {
  mounted() {},
  methods: {
    async login() {
		if (!(await this.ethEnabled())) {
			alert("Please install MetaMask to use this dApp!");
		}
		console.log('Here')
		this.$store.commit('UPDATE_USER_INFO', { displayName: window.ethereum.selectedAddress })
		
	},
    async ethEnabled() {
      if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        await window.ethereum.enable();
        return true;
      }
      return false;
    },
  },
};
</script>
