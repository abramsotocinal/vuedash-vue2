<template>
    <v-main>
        <v-toolbar
        dense
        floating
        style="top : 100px; left : 20px; position: fixed; z-index: 100000"
        >
            <v-menu
            max-width="500"
            :close-on-content-click="false"
            bottom
            right>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    v-bind="attrs"
                    v-on="on">
                        <v-icon>mdi-cog</v-icon>
                        </v-btn>
                </template>
                    <v-card
                    width="1100">
                        <v-card-title> Chart Options</v-card-title>
                        <v-divider></v-divider>
                        <v-textarea
                        id="ta-chart-options"
                        ref="ta-chart-options"
                        class="mx-2" 
                        style="font-family: 'Courier New', Courier, monospace" 
                        :value="prettyPrint"></v-textarea>
                        <v-card-actions>
                            <v-btn @click="saveOptions(prettyPrint)">apply</v-btn>
                        </v-card-actions>  
                    </v-card>
            </v-menu>
            <!-- <v-textarea v-model="chartOptions">
            </v-textarea> -->
        </v-toolbar>
    </v-main>   
</template>
<script>
import { v2 as darkv2 } from '@/plugins/themes/dark'
const cOptionsObj = Object.freeze(
    { 
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
    })
export default {
    name: 'ChartOptions',
    data: () => {
        return {
            colapse: true,
            chartOptions: Object.assign({},cOptionsObj)           
        }
    },
    methods: {
        saveOptions (val) {
            Object.assign(this.chartOptions, JSON.parse(this.$refs['ta-chart-options'].value))
            console.log(this.chartOptions)
            console.log(JSON.parse(val))
        }
    },
    computed: {
        prettyPrint () {
            return JSON.stringify(this.chartOptions,null,4)
        }
    }

}
</script>
