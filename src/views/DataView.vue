<template>
    <v-main>
        <!-- component for viewing different data with different tables -->
        <data-tables :fetchedData="fetchedData"/>
    </v-main>    
</template>
<script>
import DataTables from '@/components/DataTables.vue'
export default{
    props: ['fetchedData'],
    components: {
        DataTables
    }
}
</script>
