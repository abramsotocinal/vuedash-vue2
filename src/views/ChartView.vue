<template>
    <v-main>
        <v-card class="px-3">
            
            <candles class="my-5" style="overflow-x: scroll" :darkMode="darkMode"/>
            <v-card>
                <v-card-actions>
                        <div justify="left">
                            <v-btn @click="getData" class="mx-2">get data</v-btn>
                            <v-btn @click="getChartData" class="mx-2">refresh chart</v-btn>
                        </div>
                </v-card-actions>
            </v-card>     
            <data-tables />
        </v-card>
    </v-main>    
</template>
<script>

import Candles from '@/components/charts/Candles'
import DataTables from '@/components/DataTables.vue'
import { methods as gdMethods } from '@/components/GetData.vue'
export default{
    name: 'ChartView',
    components: {
        Candles,
        DataTables
    },
    methods: gdMethods,
    computed: {
        darkMode () {
            return this.$vuetify.theme.dark
        }
    }
}
</script>
