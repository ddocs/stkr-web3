<template>
  <div class="relative">
    <div class="vx-navbar-wrapper nav-menu-wrapper">
      <vs-navbar :color="navbarColor" class="vx-navbar navbar-custom navbar-skelton">

        <ul class="menu-items flex flex-wrap w-full items-center">
          <li
              v-for="(item, index) in navMenuItems"
              :key="index"
              :class="{'mr-2': !(navMenuItems.length === index+1)}"
              class="menu-item">

            <!-- If header -->
            <template v-if="item.header">
              <h-nav-menu-header :header="item" class="menu-header relative"/>
            </template>

            <!-- If it's group -->
            <template v-else-if="item.submenu">
              <h-nav-menu-group
                  :key="`group-${index}`"
                  :group="item"
                  :groupIndex="index"
                  :open="checkGrpChildrenActive(item)"
                  bottom
                  class="menu-group relative py-4"/>
            </template>

            <!-- If it's link -->
            <div v-else-if="item.url" class="menu-link">
              <h-nav-menu-item
                  :href="item.slug === 'external' ? item.url : null"
                  :icon="item.icon"
                  :isDisabled="item.isDisabled"
                  :slug="item.slug"
                  :target="item.target"
                  :to="item.slug !== 'external' ? item.url : null"
                  class="relative py-4 cursor-pointer">
                <span class="truncate">{{ item.name }}</span>
                <vs-chip v-if="item.tag" :color="item.tagColor">{{ item.tag }}</vs-chip>
              </h-nav-menu-item>
            </div>

          </li>
        </ul>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import HNavMenuGroup from './HorizontalNavMenuGroup.vue'
import HNavMenuHeader from './HorizontalNavMenuHeader.vue'
import HNavMenuItem from './HorizontalNavMenuItem.vue'

export default {
  props: {
    // navbarColor  : { type: String, default: "#fff", },
    navMenuItems: {
      type: Array,
      required: true
    }
  },
  components: {
    HNavMenuGroup,
    HNavMenuHeader,
    HNavMenuItem
  },
  computed: {
    navbarColor () {
      return this.$store.state.theme === 'dark' ? '#10163a' : '#fff'
    }
  },
  methods: {
    checkGrpChildrenActive (group) {
      const path = this.$route.fullPath
      let active = false
      const routeParent = this.$route.meta ? this.$route.meta.parent : undefined

      if (group.submenu) {
        group.submenu.forEach((item) => {
          if (active) return true
          if ((path === item.url || routeParent === item.slug) && item.url) {
            active = true
          } else if (item.submenu) {
            this.checkGrpChildrenActive(item)
          }
        })
      }

      return active
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/components/horizontalNavMenu.scss"
</style>
