<!-- =========================================================================================
    File Name: VxTour.vue
    Description: Tour Component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <v-tour :steps="steps" name="vuexyTour">
    <template slot-scope="tour">
      <transition name="fade">
        <v-step
            v-for="(step, index) of tour.steps"
            v-if="tour.currentStep === index"
            :key="index"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels"
            :next-step="tour.nextStep"
            :previous-step="tour.previousStep"
            :step="step"
            :stop="tour.stop">

          <div slot="actions" class="flex justify-center">
            <vs-button
                v-if="tour.currentStep != tour.steps.length - 1"
                class="mr-3"
                color="#fff"
                icon="icon-x"
                icon-after
                icon-pack="feather"
                size="small"
                type="border"
                @click="tour.stop">
              Skip
            </vs-button>

            <vs-button
                v-if="tour.currentStep"
                class="mr-3"
                color="#fff"
                icon="icon-chevrons-left"
                icon-pack="feather"
                size="small"
                type="border"
                @click="tour.previousStep">
              Previous
            </vs-button>

            <vs-button
                v-if="tour.currentStep != tour.steps.length - 1"
                class="btn-tour-next"
                color="#fff"
                icon="icon-chevrons-right"
                icon-after
                icon-pack="feather"
                size="small"
                type="border"
                @click="tour.nextStep">
              Next
            </vs-button>

            <vs-button
                v-if="tour.currentStep == tour.steps.length - 1"
                class="btn-tour-finish"
                color="#fff"
                icon="icon-check-circle"
                icon-after
                icon-pack="feather"
                size="small"
                type="border"
                @click="tour.stop">
              Finish
            </vs-button>
          </div>

        </v-step>
      </transition>
    </template>
  </v-tour>
</template>

<script>
export default {
  name: 'vx-tour',
  props: {
    steps: {
      required: true,
      type: Array
    }
  },
  watch: {
    '$route.path' () {
      this.$tours['vuexyTour'].stop()
    }
  },
  mounted () {
    this.$tours['vuexyTour'].start()
  }
}
</script>

<style lang="scss">
.v-tour {
  .v-step {
    z-index: 55000;
    background-color: rgba(var(--vs-primary), 1);
    border-radius: .5rem;
    padding: 1.5rem;
    filter: drop-shadow(0 0 7px rgba(0, 0, 0, .5));

    .v-step__arrow {
      border-color: rgba(var(--vs-primary), 1);
    }

    .vs-button-border:not(.btn-tour-next):not(.btn-tour-finish) {
      border-color: rgba(255, 255, 255, .5) !important;
    }
  }
}
</style>
