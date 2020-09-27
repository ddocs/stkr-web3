<template>
  <div>
    <vs-table :data="pools" search>

      <template slot="thead">
        <vs-th sort-key="provider">Provider</vs-th>
        <vs-th sort-key="name">Validator</vs-th>
        <vs-th sort-key="status">Status</vs-th>
        <vs-th sort-key="totalStake">Total Stake</vs-th>
        <vs-th sort-key="fee">Fee</vs-th>
        <vs-th sort-key="reward">Reward</vs-th>
        <vs-th sort-key="claimed">Claimed Balance</vs-th>
        <vs-th sort-key="">Action</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr v-for="(tr, indextr) in pools" :key="indextr">

          <vs-td :data="data[indextr].provider">
            {{ data[indextr].provider }}
          </vs-td>

          <vs-td :data="data[indextr].validator">
            {{ data[indextr].validator }}
          </vs-td>

          <vs-td :data="data[indextr].status">
            {{ Number(data[indextr].stakeable) ? 'Staking' : 'Ongoing' }}
          </vs-td>

          <vs-td :data="data[indextr].totalStakedAmount">
            {{ data[indextr].totalStakedAmount }} ETH
          </vs-td>

          <vs-td :data="data[indextr].nodeFee">
            {{ data[indextr].nodeFee }} USDT
          </vs-td>

          <vs-td :data="data[indextr].reward">
            {{ data[indextr].reward || 0 }} ETH
          </vs-td>

          <vs-td :data="data[indextr].claimedBalance">
            {{ data[indextr].claimedBalance || 0 }} ETH
          </vs-td>

          <vs-td>
            <vs-button :disabled="!Number(data[indextr].stakeable)" @click="poolModal = true; modalData = data[indextr]">
              Stake
            </vs-button>
            
          </vs-td>

        </vs-tr>
      </template>
    </vs-table>

    <vs-popup
        :active.sync="poolModal"
        :button-accept="false"
        title="Staking"
        color="primary"
        @close="modalData = {}"
    >
      <p class="ml-3 text-danger text-large">Fee: {{ modalData.nodeFee }} USDT </p>

      <vs-tabs alignment="fixed">
        <vs-tab label="Pay with eth">
          <p class="con-tab-ejemplo">
          <p class="mb-5">
            <vs-input class="mb-6" disabled="true" :value="modalData.nodeFee" title="Ether Value"></vs-input>
            <vs-input title="Stake Amount" v-model="stakeValEth"></vs-input>
          </p>
          <vs-button @click="stakeWithEth">Stake</vs-button>
        </vs-tab>
        <vs-tab label="Pay with ANKR">
          <div class="con-tab-ejemplo">
            Pay with ANKR
          </div>
        </vs-tab>
        <vs-tab label="Pay with staked ANKR">
          <div class="con-tab-ejemplo">
            Pay with Staked ANKR
          </div>
        </vs-tab>
      </vs-tabs>

    </vs-popup>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Pools',
  data () {
    return {
      poolModal: false,
      modalData: {},
      stakeValEth: 0.5
    }
  },
  mounted () {
    
  },
  computed: {
    ...mapState(['pools'])
  },
  methods: {
    async stakeWithEth (index) {
      const contract = await this.$store.dispatch('getContract', 'Micropool')
      console.log("mi", contract)
      await contract.methods.stake(this.modalData.poolIndex).send({
        value: web3.utils.toWei(this.stakeValEth.toString())
      })
      this.$store.dispatch('getMicropools')
    }
  }
}
</script>

<style scoped>

</style>
