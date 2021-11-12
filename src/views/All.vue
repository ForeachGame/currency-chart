<template>
    <div>
        <AppChart />
        <AppTable />
    </div>
</template>

<script>
import AppTable from "../components/table/AppTable";
import AppChart from "../components/chart/AppChart";

export default {
    name: "All",
    components: {
        AppTable,
        AppChart
    }
}
</script>

<style scoped>

</style>