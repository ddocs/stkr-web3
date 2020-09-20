<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-1/2 md:w-1/4 xl:w-1/4">
        <div class="vx-card overflow-hidden mb-base"><!---->
          <div>
            <div class="p-6 text-center"><span
                class="p-3 inline-flex rounded-full feather-icon select-none relative text-primary mb-4"
                style="background: rgba(var(--vs-primary),0.15);"><svg class="feather feather-eye " fill="none"
                                                                       height="24px" stroke="currentColor"
                                                                       stroke-linecap="round"
                                                                       stroke-linejoin="round" stroke-width="2"
                                                                       viewBox="0 0 24 24" width="24px"
                                                                       xmlns="http://www.w3.org/2000/svg"><path
                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12"
                                                                                r="3"></circle></svg></span>
              <div class="truncate"><h2 class="mb-1 font-bold">
                {{ stakeStats.userTotal }} ANKR</h2>
                <span>Your Stakes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="vx-col w-1/2 md:w-1/4 xl:w-1/4">
        <div class="vx-card overflow-hidden mb-base"><!---->
          <div>
            <div class="p-6 text-center"><span
                class="p-3 inline-flex rounded-full feather-icon select-none relative text-primary mb-4"
                style="background: rgba(var(--vs-primary),0.15);"><svg class="feather feather-eye " fill="none"
                                                                       height="24px" stroke="currentColor"
                                                                       stroke-linecap="round"
                                                                       stroke-linejoin="round" stroke-width="2"
                                                                       viewBox="0 0 24 24" width="24px"
                                                                       xmlns="http://www.w3.org/2000/svg"><path
                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12"
                                                                                r="3"></circle></svg></span>
              <div class="truncate"><h2 class="mb-1 font-bold">
                {{ stakeStats.total }}</h2>
                <span>Total Stakes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="vx-col w-1/2 md:w-1/4 xl:w-1/4">
        <div class="vx-card overflow-hidden mb-base"><!---->
          <div>
            <div class="p-6 text-center">
              <div class="truncate">
                <vs-input v-model="stakeAmount" label-placeholder="Stake Amount"></vs-input>
                <vs-button color="black" @click="stake">Stake</vs-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="vx-col w-1/2 md:w-1/4 xl:w-1/4">
        <div class="vx-card overflow-hidden mb-base"><!---->
          <div>
            <div class="p-6 text-center">
              <div class="vx-input-group vx-input-group-default">
                <vs-input v-model="unstakeAmount" label-placeholder="Unstake Amount"></vs-input>
                <vs-button color="black" @click="unstake">Unstake</vs-button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'Staking',
  data () {
    return {
      stakingContract: {},
      stakeAmount: 0,
      unstakeAmount: 0
    }
  },
  async mounted () {

  },
  methods: {
    ...mapActions(['stakeStats', 'getContract']),
    async stake () {
      const contract = await this.getContract('Staking')
      await contract.methods.stake(this.stakeAmount).send()
      this.$store.dispatch('stakeStats')
    },

    async unstake () {
      const contract = await this.getContract('Staking')
      await contract.methods.unstake(this.unstakeAmount).send()
      this.$store.dispatch('stakeStats')
    }
  },
  computed: {
    ...mapState(['stakeStats'])
  }
}
</script>

<style scoped>

</style>
