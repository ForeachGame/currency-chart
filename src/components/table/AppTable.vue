<template>
    <div>
        <b-table
            id="currency-table"
            :items="getData"
            :per-page="perPage"
            :current-page="currentPage"
            striped
            hover
            ></b-table>
        <b-pagination
            v-show="getData.length > 0"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="currency-table"
        ></b-pagination>
    </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "AppTable",
    data() {
        return {
            perPage: 7,
            currentPage: 1,
        }
    },
    computed: {
        ...mapGetters(['getData']),
        rows() {
            return this.getData.length
        }
    },
}
</script>

<style scoped>

</style>