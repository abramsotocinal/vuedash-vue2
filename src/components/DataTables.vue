<template>
    <v-main>
        <div id="datatable">
            <v-data-table
            dense
            v-if="fetchCleanData==null"
            >
            Data empty
            </v-data-table>
            
            <v-data-table
            v-else
            :headers ="headers"
            :items="fetchCleanData"
            item-key="date">>
            </v-data-table>
        </div>
    </v-main>
</template>
<script>
export default {
    name: 'DataTablesComp',
    props: ['fetchedData'],
    data: () => {
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
    },
    created () {
    },
    computed: {
        fetchCleanData () {
            return this.$store.getters.cleanData
        }
    }
}
</script>
