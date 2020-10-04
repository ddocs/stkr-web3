<template>
  <vs-row>
    <vs-card>
      <vs-navbar-title>Send Micropool Data</vs-navbar-title>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input
                v-model="poolIndex"
                class="w-full"
                label-placeholder="Pool Index"
            />
            <vs-input
                v-model="validatorData"
                class="w-full"
                label-placeholder="Validator Data"
            />
          </div>
          <vs-button @click="send(poolIndex, validatorData)">Send</vs-button>
        </div>
      </vs-card>

  </vs-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Governance',
  data () {
    return {
      poolsToApprove: [],
      poolIndex: 0,
      validatorData: ''
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions(['approveProvider']),
    async send(index, validatorData) {
      const vd = JSON.parse(validatorData);
      console.log(vd)
      const res = web3.eth.abi.decodeParameters(['bytes', 'bytes', 'bytes', 'bytes32'], vd.depositData.slice(8))

      const micropoolContract = await this.$store.dispatch('getContract', 'Micropool')
      await micropoolContract.methods.updatePoolData(index, vd.validatorId, res[0], res[1], res[2], res[3]).send()
    }
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
