<template>
  <vs-row>
    <vs-col vs-lg="6">
      <vs-table search :data="providers">

        <template slot="thead">
          <vs-th sort-key="name">Address</vs-th>
          <vs-th sort-key="provider">Total Stake</vs-th>
          <vs-th sort-key="">Action</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in pools">

            <vs-td :data="data[indextr].address">
              {{ data[indextr].address }}
            </vs-td>

            <vs-td :data="data[indextr].totalStake">
              {{ data[indextr].totalStake }}
            </vs-td>

            <vs-td :data="data[indextr].status">
              {{ data[indextr].status }}
            </vs-td>

            <vs-td>
              <vs-button v-show="data[indextr].status === 'Pending'" @click="approveProvider(data[indextr].address)">
                Approve
              </vs-button>
            </vs-td>

          </vs-tr>
        </template>
      </vs-table>
    </vs-col>
    <vs-col vs-lg="6">
      <vs-table search :data="pools">

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
          <vs-tr :key="indextr" v-for="(tr, indextr) in pools">

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
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: 'Governance',
  data () {
    return {
      providers: [],
      poolsToApprove: []
    }
  },
  methods: {
    approveProvider () {

    }
  }
}
</script>

<style scoped>

</style>
