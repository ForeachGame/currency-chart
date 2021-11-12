<template>
    <div id="app">
        <AppNavbar />
        <AppFilter
            @get-selected-currency="getSelectedCurrency"
            @get-current-currency="getCurrentCurrency"
            @get-date-from="getDateFrom"
            @get-date-to="getDateTo"
            @get-data="getData"
        />
        <router-view
            :selectedCurrency="selectedCurrency"
            :data="data"
        />
    </div>
</template>

<style>

</style>
<script>
import AppNavbar from "./components/AppNavbar";
import AppFilter from "./components/AppFilter";
import axios from "axios";

export default {
    data() {
        return {
            selectedCurrency: [],
            date: {
                from: '',
                to: ''
            },
            currentCurrency: '',
            data: {}

        }
    },
    components: {
        AppNavbar,
        AppFilter
    },
    methods: {
        getSelectedCurrency(selected) {
            this.selectedCurrency = selected
        },
        getCurrentCurrency(current) {
            this.currentCurrency = current
        },
        getDateFrom(date) {
            this.date.from = date
        },
        getDateTo(date) {
            this.date.to = date
        },
        getData() {
            let params = {}
            let url = 'https://api.frankfurter.app/';
            let date = 'latest'

            if(this.currentCurrency) {params = {from: this.currentCurrency, ...params}}
            if(this.selectedCurrency) {params = {to: this.selectedCurrency.join(','), ...params}}
            if(this.date.from.length > 0) {
                if(this.date.from === this.date.to) {
                    date = this.date.from
                } else {
                    date = this.date.from + '..' + this.date.to
                }
            }

            axios
                .get(url+date, {params})
                .then(response => {
                    this.data = response.data
                })

        }
    }
}
</script>