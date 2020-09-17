<template>
  <!--eslint-disable-->
  <vs-row>
    <div>
      <vs-card>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Provider Name" v-model="providerName"/>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" type="text" label-placeholder="Website" v-model="website"/>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Icon URL" v-model="iconUrl"/>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
            <vs-input class="w-full" type="email" label-placeholder="Email" v-model="email"/>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button class="mr-3 mb-2" :disabled="!activeUserInfo.displayName" @click="apply">Submit</vs-button>
          </div>
        </div>
      </vs-card>
    </div>
  </vs-row>
</template>

<script>
/* eslint-disable */
import artifacts from '@/artifacts'

export default {
  name: 'provider',
  data () {
    return {
      providerName: '0x616e696c00000000000000000000000000000000000000000000000000000000',
      website: '0x616e696c00000000000000000000000000000000000000000000000000000000',
      iconUrl: '0x616e696c00000000000000000000000000000000000000000000000000000000',
      email: '0x616e696c00000000000000000000000000000000000000000000000000000000'
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    apply () {
      const contract = new window.web3.eth.Contract(artifacts.Provider.abi, artifacts.Provider.address, {
        from: this.activeUserInfo.displayName
      })
      console.log(
          window.web3.utils.hexToBytes((window.web3.utils.fromAscii(this.providerName))),
          window.web3.utils.hexToBytes((window.web3.utils.fromAscii(this.website))),
          window.web3.utils.hexToBytes((window.web3.utils.fromAscii(this.iconUrl))),
          window.web3.utils.hexToBytes((window.web3.utils.fromAscii(this.email)))
      )
      contract.methods.applyToBeProvider(
          window.web3.utils.hexToBytes((window.web3.utils.fromAscii(this.providerName))),
          window.web3.utils.hexToBytes((window.web3.utils.fromAscii(this.website))),
          window.web3.utils.hexToBytes((window.web3.utils.fromAscii(this.iconUrl))),
          window.web3.utils.hexToBytes((window.web3.utils.fromAscii(this.email)))).send({ value: window.web3.utils.toWei('1') })
    }
  }
}
</script>
