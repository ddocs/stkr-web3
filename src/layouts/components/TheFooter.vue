<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template functional>
  <footer :class="classes" class="the-footer flex-wrap justify-between">
    <p>
      <span>COPYRIGHT &copy;</span>
      <span>{{ new Date().getFullYear() }} </span>
      <a href="https://1.envato.market/vuexy_admin" rel="nofollow" target="_blank">Pixinvent</a>
      <span class="hidden sm:inline-block">, All rights Reserved</span>
    </p>
    <span class="md:flex hidden items-center">
            <span>Hand-crafted & Made with</span>
            <feather-icon class="ml-2" icon="HeartIcon" svgClasses="stroke-current text-danger w-6 h-6"/>
        </span>
  </footer>
</template>

<script>
export default {
  name: 'the-footer',
  props: {
    classes: {
      type: String
    }
  }
}
</script>
