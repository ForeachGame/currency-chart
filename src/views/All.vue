<template>
    <div>
        <AppChart
            :data="data"
            :selectedCurrency="selectedCurrency"
        />
        <AppTable
            :data="data"
            :selectedCurrency="selectedCurrency"
        />
    </div>
</template>

<script>
import AppTable from "../components/table/AppTable";
import AppChart from "../components/chart/AppChart";
export default {
    name: "All",
    props: {
        selectedCurrency: [],
        data: {}
    },
    components: {
        AppTable,
        AppChart
    }
}
</script>

<style scoped>

</style>