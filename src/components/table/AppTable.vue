<template>
    <div>
        <b-table striped hover :items="items"></b-table>
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
            items: []
        }
    },
    watch: {
        data: function (newData){
            for (let key in newData.rates) {
                let obj = {
                    'Date': key,
                }
                this.selectedCurrency.forEach(e => {
                    const dateItem = newData.rates[key]
                    obj = {
                        ...obj,
                        [e]:dateItem[e]
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