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
