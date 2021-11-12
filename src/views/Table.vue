<template>
    <div>
        <AppTable
            :data="data"
            :selectedCurrency="selectedCurrency"
        />
    </div>
</template>

<script>
import AppTable from "../components/table/AppTable";

export default {
    name: "Table",
    props: {
        selectedCurrency: [],
        data: {}
    },
    components: {
        AppTable
    }
}
</script>

<style scoped>

</style>