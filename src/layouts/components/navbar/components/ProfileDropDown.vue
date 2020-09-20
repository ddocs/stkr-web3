<template>
  <div class="the-navbar__user-meta flex items-center">
    <vs-button v-if="!activeUserInfo.displayName" color="success" type="filled" @click="login">Login</vs-button>
    <p v-else class="font-semibold">{{ activeUserInfo.displayName }}</p>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    ...mapActions(['login']),
    logout () {
      localStorage.removeItem('userInfo')

      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push('/pages/login').catch(() => {
      })
    }
  }
}
</script>
