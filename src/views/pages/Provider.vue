<template>
  <!--eslint-disable-->
  <div class="vx-row vs-align-center">
      <vs-card class="vx-col vs-lg-3 mr-2" >
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input
                class="w-full"
                label-placeholder="Provider Name"
                v-model="providerName"
            />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input
                class="w-full"
                type="text"
                label-placeholder="Website"
                v-model="website"
            />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input
                class="w-full"
                label-placeholder="Icon URL"
                v-model="iconUrl"
            />
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
            <vs-input
                class="w-full"
                type="email"
                label-placeholder="Email"
                v-model="email"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button
                class="mr-3 mb-2"
                :disabled="!activeUserInfo.displayName"
                @click="apply"
            >Submit
            </vs-button
            >
          </div>
        </div>
      </vs-card>
      <vs-card class="vx-col vs-lg-8">
        <vs-navbar-title>Approved Providers</vs-navbar-title>
        <vs-table :data="appliedProviders">
          <template slot="thead">
            <vs-th sort-key="name">Address</vs-th>
            <vs-th sort-key="totalStake">Total Stake</vs-th>
            <vs-th sort-key="status">Status</vs-th>
          </template>

          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in appliedProviders">
              <vs-td :data="data[indextr].address">
                {{ data[indextr].address }}
              </vs-td>

              <vs-td :data="data[indextr].stakes">
                {{ data[indextr].stakes }} ANKR
              </vs-td>

              <vs-td :data="data[indextr].status">
                {{ data[indextr].status }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vs-card>
  </div>
</template>

<script>
/* eslint-disable */
import artifacts from '@/artifacts'
import { mapGetters } from 'vuex'

export default {
  name: 'provider',
  data () {
    return {
      providerName: 'test name',
      website: 'test website',
      iconUrl: 'test icon url',
      email: 'test email'
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    },
    ...mapGetters(['appliedProviders'])
  },
  methods: {
    stringToBytes (data) {
      return web3.utils.padRight(web3.utils.asciiToHex(data), 64)
    },

    async apply () {
      const contract = new window.web3.eth.Contract(
          artifacts.Provider.abi,
          artifacts.Provider.address,
          {
            from: this.activeUserInfo.displayName
          }
      )

      await contract.methods
          .applyToBeProvider(
              this.stringToBytes(this.providerName),
              this.stringToBytes(this.website),
              this.stringToBytes(this.iconUrl),
              this.stringToBytes(this.email),
              1000
          )
          .send({
            gasLimit: 300000
          })

      this.$store.dispatch('getProviders')
    }
  }
}
</script>
