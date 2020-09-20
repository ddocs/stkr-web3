<template>
  <vs-dropdown class="cursor-pointer" vs-custom-content vs-trigger-click>
    <span class="cursor-pointer flex items-center i18n-locale">
      <img :alt="$i18n.locale" :src="i18n_locale_img" class="h-4 w-5"/>
      <span class="hidden sm:block ml-2">{{ getCurrentLocaleData.lang }}</span>
    </span>
    <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
      <vs-dropdown-item @click="updateLocale('en')"><img alt="en" class="h-4 w-5 mr-1"
                                                         src="@/assets/images/flags/en.png"/> &nbsp;English
      </vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('fr')"><img alt="fr" class="h-4 w-5 mr-1"
                                                         src="@/assets/images/flags/fr.png"/> &nbsp;French
      </vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('de')"><img alt="de" class="h-4 w-5 mr-1"
                                                         src="@/assets/images/flags/de.png"/> &nbsp;German
      </vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('pt')"><img alt="pt" class="h-4 w-5 mr-1"
                                                         src="@/assets/images/flags/pt.png"/> &nbsp;Portuguese
      </vs-dropdown-item>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
export default {
  computed: {
    i18n_locale_img () {
      // Use below code to dynamically fetch image instead of if-else
      // NOTE: We used if-else because laravel throws error in 'yarn prod'.
      // If you are not using laravel + Vue, you can use below code to dynamically get image
      // return require(`@/assets/images/flags/${this.$i18n.locale}.png`)

      const locale = this.$i18n.locale
      if (locale === 'en') return require('@/assets/images/flags/en.png')
      else if (locale === 'pt') return require('@/assets/images/flags/pt.png')
      else if (locale === 'fr') return require('@/assets/images/flags/fr.png')
      else if (locale === 'de') return require('@/assets/images/flags/de.png')
      else return require('@/assets/images/flags/en.png')
    },
    getCurrentLocaleData () {
      const locale = this.$i18n.locale
      if (locale === 'en') return {
        flag: 'us',
        lang: 'English'
      }
      else if (locale === 'pt') return {
        flag: 'br',
        lang: 'Portuguese'
      }
      else if (locale === 'fr') return {
        flag: 'fr',
        lang: 'French'
      }
      else if (locale === 'de') return {
        flag: 'de',
        lang: 'German'
      }
    }
  },
  methods: {
    updateLocale (locale) {
      this.$i18n.locale = locale
    }
  }
}
</script>
