<template>
  <div class="vx-row vs-align-center">
    <div class="vx-col vs-lg-3 mr-2">
      <vs-card>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input
              v-model="providerName"
              class="w-full"
              label-placeholder="Provider Name"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button
              :disabled="!activeUserInfo.displayName || userIsProvider"
              class="mr-3 mb-2"
              @click="apply"
            >
              {{ userIsProvider ? "You are a provider" : "Become a provider" }}
            </vs-button>
          </div>
        </div>
      </vs-card>

      <vs-card>
        <div class="vx-row">
          <div class="vx-row mb-2">
            <div class="vx-col w-full">
              <vs-input
                v-model="poolName"
                class="w-full"
                label-placeholder="Provider Name"
              />
            </div>
          </div>
          <div class="vx-col w-full">
            <vs-button
              :disabled="!activeUserInfo.displayName || !userIsProvider"
              class="mr-3 mb-2"
              @click="createPool"
              >Create a pool
            </vs-button>
          </div>
        </div>
      </vs-card>

      <vs-card>
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button
              :disabled="!activeUserInfo.displayName || !userIsProvider"
              class="mr-3 mb-2"
              @click="createNodeCertificate"
              >Create a node certificate
            </vs-button>
          </div>
        </div>
      </vs-card>
    </div>
    <vs-card class="vx-col vs-lg-8">
      <vs-navbar-title>Providers</vs-navbar-title>
      <vs-table :data="providers">
        <template slot="thead">
          <vs-th sort-key="name">Name</vs-th>
          <vs-th sort-key="address">Address</vs-th>
          <vs-th sort-key="totalStake">Total Stake</vs-th>
          <vs-th sort-key="status">Status</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr v-for="(tr, indextr) in providers" :key="indextr">
            <vs-td :data="data[indextr].name">
              {{ data[indextr].name }}
            </vs-td>

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
import artifacts from "@/artifacts";
import { mapState, mapGetters } from "vuex";
import axios from "@/axios";
import beacon from "@/beacon.abi";

export default {
  name: "provider",
  data() {
    return {
      providerName: "",
      poolName: "",
      pool: "",
      poolFee: 0
    };
  },
  watch: {
    poolFee() {
      if (this.poolFee && this.poolFee > 10) {
        this.poolFee = 10;
      } else if (this.poolFee && this.poolFee < 1) {
        this.poolFee = 1;
      }
    }
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
    ...mapGetters(["userIsProvider"]),
    ...mapState(["providers"])
  },
  methods: {
    decodeBeaconData(data) {
      const [
        pubkey,
        withdrawalInfo,
        signature,
        depositData
      ] = web3.eth.abi.decodeParameters(
        ["bytes", "bytes", "bytes", "bytes32"],
        data
      );
      return { pubkey, withdrawalInfo, signature, depositData };
    },
    createNodeCertificate() {
      const nodeId = web3.eth.accounts.create().address;
      axios
        .post("/node", {
          providerId: this.activeUserInfo.displayName,
          nodeId
        })
        .then(r => {
          this.forceFileDownload(r, "node_cert" + nodeId + ".json");
          const validatorId = web3.eth.accounts.create().address;
          axios
            .post("/node/validator", {
              providerId: this.activeUserInfo.displayName,
              nodeId,
              validatorId
            })
            .then(r =>
              this.forceFileDownload(
                r,
                "validator_data_" + validatorId + ".json"
              )
            );
        });
    },
    forceFileDownload(response, filename) {
      const url = window.URL.createObjectURL(
        new Blob([JSON.stringify(response.data)])
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();
    },

    stringToBytes(data) {
      return web3.utils.padRight(web3.utils.asciiToHex(data), 64);
    },

    async createPool() {
      const micropoolContract = await this.$store.dispatch(
        "getContract",
        "Micropool"
      );

      await micropoolContract.methods.initializePool(this.stringToBytes(this.poolName)).send();
    },

    async apply() {
      const contract = new window.web3.eth.Contract(
        artifacts.Provider.abi,
        artifacts.Provider.address,
        {
          from: this.activeUserInfo.displayName
        }
      );

      await contract.methods
        .saveProvider(this.stringToBytes(this.providerName))
        .send({
          gasLimit: 300000
        });

      this.$store.dispatch("getProviders");
    }
  }
};
</script>
