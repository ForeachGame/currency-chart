<template>
    <div>
        <AppChart
            :data="data"
            :selectedCurrency="selectedCurrency"
        />
    </div>
</template>

<script>
import AppChart from "../components/chart/AppChart";

export default {
    name: "Chart",
    props: {
        selectedCurrency: [],
        data: {}
    },
    components: {
        AppChart
    }
}
</script>

<style scoped>

</style>