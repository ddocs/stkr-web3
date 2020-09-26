<template>
  <div>
    <home-stats/>

    <pools/>
  </div>
</template>

<script>
import HomeStats from '@/views/components/HomeStats'
import Pools from '@/views/components/Pools'
import {mapActions} from 'vuex'

export default {
  components: {
    Pools,
    HomeStats
  },
  mounted () {
    
  },
  methods: {
  }
}
</script>
