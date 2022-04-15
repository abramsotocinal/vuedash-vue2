<template>
    <v-app-bar
      fixed
      app
    >
        <div class="d-flex align-center">    
        </div>
        <v-spacer></v-spacer>
        <div class="mt-5">
        <v-switch
            v-model="darkMode" 
            :label="`Dark mode: ${darkMode? 'on': 'off' }`"
            />
        </div>
    </v-app-bar>
</template>
<script>
export default {
    name: 'AppBar',
    data () {
        return {
        darkMode: this.$vuetify.theme.dark
        }
    }
}
</script>
