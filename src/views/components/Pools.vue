<template>
  <div>
    <vs-table :data="pools" search>

      <template slot="thead">
        <vs-th sort-key="name">Name</vs-th>
        <vs-th sort-key="provider">Provider</vs-th>
        <vs-th sort-key="status">Status</vs-th>
        <vs-th sort-key="totalStake">Total Stake</vs-th>
        <vs-th sort-key="fee">Fee</vs-th>
        <vs-th sort-key="reward">Reward</vs-th>
        <vs-th sort-key="">Action</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr v-for="(tr, indextr) in pools" :key="indextr">

          <vs-td :data="data[indextr].name">
            {{ data[indextr].name }}
          </vs-td>

          <vs-td :data="data[indextr].provider">
            {{ data[indextr].provider }}
          </vs-td>

          <vs-td :data="data[indextr].status">
            {{ data[indextr].status }}
          </vs-td>

          <vs-td :data="data[indextr].totalStake">
            {{ data[indextr].totalStake }} ETH
          </vs-td>

          <vs-td :data="data[indextr].fee">
            {{ data[indextr].fee }} USDT
          </vs-td>

          <vs-td :data="data[indextr].reward">
            {{ data[indextr].reward || 0 }} ETH
          </vs-td>

          <vs-td>
            <vs-button v-show="data[indextr].status === 'Pending'" @click="poolModal = true; modalData = data[indextr]">
              Join
            </vs-button>
          </vs-td>

        </vs-tr>
      </template>
    </vs-table>

    <vs-popup
        :active.sync="poolModal"
        :button-accept="false"
        :title="`You are joining to: ${modalData.name}`"
        color="primary"
        @close="modalData = {}"
    >
      <p class="ml-3 text-danger text-large">Fee: {{ modalData.fee }}</p>

      <vs-tabs alignment="fixed">
        <vs-tab label="Pay with eth">
          <p class="con-tab-ejemplo">
          <p class="mb-5">
            <vs-input class="mb-6" disabled="true" value="ETH Value: 0.001"></vs-input>
            <vs-input label-placeholder="Stake Value"></vs-input>
          </p>
          <vs-button>Join</vs-button>
        </vs-tab>
        <vs-tab label="Pay with ANKR">
          <div class="con-tab-ejemplo">
            Service
          </div>
        </vs-tab>
        <vs-tab label="Pay with staked ANKR">
          <div class="con-tab-ejemplo">
            login
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
      modalData: {}
    }
  },
  mounted () {
    this.$store.dispatch('updatePools')
  },
  computed: {
    ...mapState(['pools'])
  },
  methods: {
    // eslint-disable-next-line
    join (index) {

    }
  }
}
</script>

<style scoped>

</style>
