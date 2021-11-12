<template>
    <div>
        <b-table
            id="currency-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            striped
            hover
            ></b-table>
        <b-pagination
            v-show="items.length > 0"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="currency-table"
        ></b-pagination>
    </div>

</template>

<script>
export default {
    name: "AppTable",
    props: {
        data: {},
        selectedCurrency: []
    },
    data() {
        return {
            perPage: 10,
            currentPage: 1,
            items: []
        }
    },
    computed: {
        rows() {
            return this.items.length
        }
    },
    watch: {
        data: function (newData) {
            for (let key in newData.rates) {
                let obj = {
                    'Date': key,
                }
                this.selectedCurrency.forEach(e => {
                    const dateItem = newData.rates[key]
                    obj = {
                        ...obj,
                        [e]: dateItem[e]
                    }
                })
                this.items.push(obj)
            }
        }
    }
}
</script>

<style scoped>

</style>