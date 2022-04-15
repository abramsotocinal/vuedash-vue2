<template>
    <v-card dark>
        <v-card-text v-if="fetchedMetadata != null">
            {{ metaData.info }}
        </v-card-text>
        <v-card-actions>
            <div justify="left">
                <v-btn @click="getData" class="mx-2">get data</v-btn>
                <v-btn @click="getChartData" class="mx-2">refresh chart</v-btn>
            </div>
        </v-card-actions>  
    </v-card>
</template>
<script>
import env from 'dot-env'
env.config()

const data = function () {
    return {
        headers: 
                    [
                        { text: 'date',
                        value: 'date'},
                        { text: 'open',
                        value: 'values.open' },
                        { text: 'high',
                        value: 'values.high' },
                        { text: 'low',
                        value: 'values.low' },
                        { text: 'close',
                        value: 'values.close' },
                        { text: 'volume',
                        value: 'values.volume' },
                        { text: 'market cap',
                        value: 'values.market' }
                        ]
    }
}
const computed = {
    data () {
            return this.$store.getters.currData
        },
    metaData () {
        return this.$store.getters.metaData
    },
    dataKeys () {
        if (this.fetchedData != null) {
            return Object.keys(this.fetchedData.DCM)
        } else {
            return null
        }
    },
    cleanData () {
        return this.$store.getters.cleanData
    },
    chartHeaders () {
        return this.$store.getters.chartHeaders
    },
    newChartData () {
        return this.$store.getters.chartData
    },
    newChartDataNoMcap () {
        return this.$store.getters.chartDataNoMcap
    }
}
const methods = {
    async getData () {
        // for testing only; DON'T HARDCODE
        //const func = 'DIGITAL_CURRENCY_MONTHLY'
        const func = 'CRYPTO_INTRADAY'
        const apiKey = process.env.API_KEY
        const market = 'USD'
        const symbol = 'ETH'
        const query = `symbol=${symbol}&market=${market}&apikey=${apiKey}&function=${func}&interval=5min` // testing
        const urlTest = 'https://www.alphavantage.co/query?'
        let ret = await this.$store.dispatch('getData',`${urlTest}${query}`)
        if (ret == 200) {
            if (this.$store.getters.currData != null) {
                if(this.$store.dispatch('cleanData')) {
                    console.log('data cleaned successfully')
                } else {
                    console.error('error getting clean data')
                }
            }
        }
        this.getChartData()
    },
    getChartData () {
        this.$store.dispatch('convertToChartData', data().headers)
    },
    getChartHeaders () {

    }
}
export { data, computed, methods }
export default {
    name: 'GetData',
    data: data,
    computed: computed,
    methods: methods
}
</script>