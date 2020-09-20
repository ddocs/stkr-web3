<template functional>
  <div :class="data.staticClass" class="vx-input-group flex">

    <!-- SLOT: PREPEND -->
    <div v-if="slots().prepend" :class="props.prependClasses" class="vx-input-group-prepend flex">
      <slot name="prepend"></slot>
    </div>

    <!-- SLOT: DEFAULT -->
    <div class="vx-input-group-default flex-grow">
      <slot></slot>
    </div>

    <!-- SLOT: APPEND -->
    <div v-if="slots().append" :class="props.appendClasses" class="vx-input-group-append flex">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vx-input-group',
  props: {
    prependClasses: {type: String},
    appendClasses: {type: String}
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/components/vxInputGroup.scss";
</style>
