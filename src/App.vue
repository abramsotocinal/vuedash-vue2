<template>
  <v-app ref="appMain">
    <app-bar />
    <chart-options />
    <v-main>
      <router-view :darkMode="darkMode"/>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import { computed as gdComputed, methods as gdMethods} from '@/components/GetData.vue'
import ChartOptions from '@/components/charts/ChartOptions.vue'
export default {
  name: 'AppMain',
  components: {
    ChartOptions,
    AppBar
  },
  created () {
    this.getData()
  },
  watch: {
    darkMode () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  },
  computed: gdComputed,
  methods: gdMethods
};
</script>
