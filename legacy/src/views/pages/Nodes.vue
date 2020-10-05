<template>
  <div >
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Nodes',
  methods: {
    ...mapActions(['nodes'])
  }
}
</script>

<style scoped>

</style>
