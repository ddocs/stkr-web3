<template>
  <vs-row>
    <vs-card>
      <vs-navbar-title>Providers to approve</vs-navbar-title>
      <vs-table :data="providers">
        <template slot="thead">
          <vs-th sort-key="name">Address</vs-th>
          <vs-th sort-key="totalStake">Total Stake</vs-th>
          <vs-th sort-key="status">Status</vs-th>
          <vs-th sort-key="">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in providers">
            <vs-td :data="data[indextr].address">
              {{ data[indextr].address }}
            </vs-td>

            <vs-td :data="data[indextr].totalStake">
              {{ data[indextr].totalStake }}
            </vs-td>

            <vs-td :data="data[indextr].status">
              {{ data[indextr].status }}
            </vs-td>

            <vs-td>
              <vs-button
                v-show="data[indextr].status === 'Pending'"
                @click="approveProvider(data[indextr].address)"
              >
                Approve
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vs-card>
    <vs-card>
      <vs-navbar-title>Pools to approve</vs-navbar-title>
      <vs-table :data="pools">
        <template slot="thead">
          <vs-th sort-key="name">Name</vs-th>
          <vs-th sort-key="provider">Provider</vs-th>
          <vs-th sort-key="status">Status</vs-th>
          <vs-th sort-key="totalStake">Total Stake</vs-th>
          <vs-th sort-key="fee">Fee</vs-th>
          <vs-th sort-key="reward">Reward</vs-th>
          <vs-th sort-key="">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in pools">
            <vs-td :data="data[indextr].name">
              {{ data[indextr].name }}
            </vs-td>

            <vs-td :data="data[indextr].provider">
              {{ data[indextr].provider }}
            </vs-td>

            <vs-td :data="data[indextr].status">
              {{ data[indextr].status }}
            </vs-td>

            <vs-td :data="data[indextr].totalStake">
              {{ data[indextr].totalStake }} ETH
            </vs-td>

            <vs-td :data="data[indextr].fee">
              {{ data[indextr].fee }} USDT
            </vs-td>

            <vs-td :data="data[indextr].reward">
              {{ data[indextr].reward || 0 }} ETH
            </vs-td>

            <vs-td>
              <vs-button
                v-show="data[indextr].status === 'Pending'"
                @click="
                  poolModal = true;
                  modalData = data[indextr];
                "
              >
                Join
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vs-card>
  </vs-row>
</template>

<script>
export default {
  name: "Governance",
  data() {
    return {
      providers: [
        {
          address: "0x...",
          totalStake: "254",
          status: "Pending"
        },
        {
          address: "0x...",
          totalStake: "254",
          status: "Pending"
        }
      ],
      poolsToApprove: []
    };
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    }
  },
  methods: {
    approveProvider(providerAddress) {
      const contract = new window.web3.eth.Contract(
        artifacts.Provider.abi,
        artifacts.Provider.address,
        {
          from: this.activeUserInfo.displayName
        }
      );

      contract.methods.approve(providerAddress).send({ gasLimit: 300000 });
    }
  }
};
</script>

<style scoped></style>
