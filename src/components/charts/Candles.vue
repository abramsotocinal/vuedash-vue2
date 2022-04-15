<template>
    <v-main>
        <div>
            <GChart
                id="gchart"
                type="CandlestickChart"
                :settings="{ packages: ['corechart'] }"
                :data="newChartDataNoMcap"
                :options="chartOptions"
                />
        </div>
    </v-main>
</template>
<script>
import { GChart } from 'vue-google-charts'
// eslint-disable-next-line
import { v1 as darkv1, v2 as darkv2 } from '@/plugins/themes/dark'
import light from '@/plugins/themes/light'
import { computed as gdComputed } from '@/components/GetData.vue'
export default {
    name: 'CandlesComp',
    components: {
        GChart
    },
    props: ['darkMode'],
    data: function () {
        return {
            theme: this.toggleDark(this.darkMode),
            // Array will be automatically processed with visualization.arrayToDataTable function
            chartData: [],
            convertTickerData: [],
            chartOptions: {
                legend: 'none',
                title: null,
                subtitle: null,
                height: 800,
                width: 1500,
                aggregationTarget: 'series',
                backgroundColor: darkv2.primary,// this.darkMode? this.theme.darkv2.secondary : this.theme.light.secondary, 
                textColor: '#000000',
                series: [
                    { 
                        fallingColor: {  
                            fill: '#FF0000' 
                            },
                        risingColor: { 
                            fill: '#008000'   // green
                            }
                    }
                ],
                candlestick: {
                    fallingColor: {  
                        fill: '#FF0000' }, // red
                    risingColor: { 
                        fill: '#008000' }   // green
                    },
                chartArea: {
                    width: '100%',
                    height: '50%',
                    top: 100,
                    left: 50,
                    right: 50,
                    bottom: 100,
                    backgroundColor: darkv2.background //this.darkMode? this.theme.darkv2.background : this.theme.light.background // '#261C2C'
                },
                hAxis: {
                    showTextEvery: 5
                },
                vAxis: {
                    viewWindowMode: 'pretty'
                }
            },
        }
    },
    watch: {
        fetchedMetadata (val) {
            this.chartOptions.title = val.info
            this.chartOptions.subtitle = val.currency_code
        },
        darkMode (val) {
            this.theme = this.toggleDark(val)
        }
    },
    beforeMount () {
        
    },
    mounted () {
    },
    methods: {
        toggleDark (val) {
             return val? {
                primary: darkv2.primary,
                secondary: darkv2.secondary,
                accent: darkv2.accent,
                error: darkv2.error,
                background: darkv2.background,
                info: darkv2.info
            } : {
                primary: light.primary,
                secondary: light.secondary,
                accent: light.accent,
                error: light.error,
                background: light.background,
                info: light.info
            }
        }
    },
    computed: gdComputed
}
</script>