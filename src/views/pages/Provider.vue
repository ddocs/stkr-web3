<template>
  <vs-row>
    <div>
      <vs-card>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="First Name" v-model="input17"/>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" type="email" label-placeholder="Email" v-model="input18"/>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Mobile" v-model="input19"/>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
            <vs-input class="w-full" type="password" label-placeholder="Password" v-model="input20"/>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col w-full">
            <vs-checkbox class="inline-flex" v-model="check5">Remember Me</vs-checkbox>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-button class="mr-3 mb-2">Submit</vs-button>
            <vs-button color="warning" type="border" class="mb-2"
                       @click="input17 = input18 = input19 = input20 = ''; check5 = false;">Cancle
            </vs-button>
          </div>
        </div>
      </vs-card>
    </div>
  </vs-row>
</template>

<script>
export default {
  name: 'provider'
}
</script>