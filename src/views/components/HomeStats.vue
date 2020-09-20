<template>
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
              -</h2>
              <span>Staker</span>
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
              -</h2>
              <span>Provider</span>
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
              <span>Staked</span>
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
              200k ETH</h2>
              <span>Distributed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'HomeStats',
  computed: {
    ...mapState(['stakeStats'])
  }
}
</script>

<style scoped>

</style>
