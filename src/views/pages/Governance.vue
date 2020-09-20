<template>
  <vs-row>
    <vs-card>
      <vs-navbar-title>Providers to approve</vs-navbar-title>
      <vs-table :data="pendingProviders">
        <template slot="thead">
          <vs-th sort-key="name">Address</vs-th>
          <vs-th sort-key="totalStake">Total Stake</vs-th>
          <vs-th sort-key="status">Status</vs-th>
          <vs-th sort-key="">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr v-for="(tr, indextr) in pendingProviders" :key="indextr">
            <vs-td :data="data[indextr].address">
              {{ data[indextr].address }}
            </vs-td>

            <vs-td :data="data[indextr].stakes">
              {{ data[indextr].stakes }} ANKR
            </vs-td>

            <vs-td :data="data[indextr].status">
              {{ data[indextr].status }}
            </vs-td>

            <vs-td>
              <vs-button
                  @click="approveProvider(data[indextr].address)"
              >
                Approve
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vs-card>
    <vs-card>
      <vs-navbar-title>Nodes to approve</vs-navbar-title>
      <vs-table class="col-lg-6" :data="nodes" search>

        <template slot="thead">
          <vs-th sort-key="name">Provider</vs-th>
          <vs-th sort-key="provider">Validator Count</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr v-for="(tr, indextr) in nodes" :key="indextr">

            <!--          <vs-td :data="data[indextr].name">-->
            <!--            {{ data[indextr].name }}-->
            <!--          </vs-td>-->

            <!--          <vs-td :data="data[indextr].provider">-->
            <!--            {{ data[indextr].provider }}-->
            <!--          </vs-td>-->

            <!--          <vs-td :data="data[indextr].status">-->
            <!--            {{ data[indextr].status }}-->
            <!--          </vs-td>-->

            <!--          <vs-td :data="data[indextr].totalStake">-->
            <!--            {{ data[indextr].totalStake }} ETH-->
            <!--          </vs-td>-->

            <!--          <vs-td :data="data[indextr].fee">-->
            <!--            {{ data[indextr].fee }} USDT-->
            <!--          </vs-td>-->

            <!--          <vs-td :data="data[indextr].reward">-->
            <!--            {{ data[indextr].reward || 0 }} ETH-->
            <!--          </vs-td>-->

            <vs-td>
              <vs-button v-show="data[indextr].status === 'Pending'" @click="poolModal = true; modalData = data[indextr]">
                Join
              </vs-button>
            </vs-td>

          </vs-tr>
        </template>
      </vs-table>
    </vs-card>
  </vs-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Governance',
  data () {
    return {
      poolsToApprove: []
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions(['approveProvider'])
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    },
    ...mapGetters(['pendingProviders'])
  }
}
</script>

<style scoped></style>
