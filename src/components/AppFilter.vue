<template>
    <div>
        <div>
            <b-dropdown
                v-on="{show: options.length < 1 ? getCurrency : ()=>{}}"
                block
                :text="currentCurrencyDropdownText"
                class="filter-dropdown">
                <b-dropdown-item
                    v-for="option in options"
                    :key="option.code"
                    @click="currentCurrency = option.code"
                >
                    {{ option.name }}
                </b-dropdown-item>
            </b-dropdown>
            <b-dropdown
                v-on="{show: options.length < 1 ? getCurrency : ()=>{}}"
                block
                :text="selectedDropdownText"
                class="m-2"
                menu-class="w-200"
            >
                <b-dropdown-form>
                    <b-form-checkbox
                        v-for="option in options"
                        v-model="selected"
                        :key="option.code"
                        :value="option.code"
                        name="flavour-3a"
                    >
                        {{ option.name }}
                    </b-form-checkbox>
                </b-dropdown-form>
            </b-dropdown>
            <b-form-datepicker
                id="filter__date-from"
                v-model="date.from"
                class="mb-2"
                :date-disabled-fn="dateFormDisabled"
            ></b-form-datepicker>
            <b-form-datepicker
                id="filter__date-to"
                v-model="date.to"
                class="mb-2"
                :date-disabled-fn="dateToDisabled"
            ></b-form-datepicker>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AppFilter",
    data() {
        return {
            currentCurrency: '',
            selected: [],
            options: [],
            date: {
                from: '',
                to:''
            }
        }
    },
    computed: {
        currentCurrencyDropdownText() {
            return this.currentCurrency.length > 0 ? this.currentCurrency : 'Основная валюта'
        },
        selectedDropdownText() {
            return this.selected.length > 0 ? this.selected.join(', ') : 'Валюты для фильтра'
        }
    },
    watch: {
        selected: function (newSelected) {
            this.$emit('get-selected-currency', newSelected)
        },
        currentCurrency: function (newValue) {
            this.$emit('get-current-currency', newValue)
        },
        'date.from': function (newDate) {
            this.$emit('get-date-from', newDate)
        },
        'date.to': function (newDate) {
            this.$emit('get-date-to', newDate)
        }
    },
    methods: {
        getCurrency() {
            axios
                .get('https://api.frankfurter.app/currencies')
                .then(response => {
                    for (let key in response.data) {
                        this.options.push({
                            code: key,
                            name: response.data[key]
                        })
                    }
                    this.$emit('get-selected-currency', this.selected)
                })
        },
        dateFormDisabled(ymd, date) {
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            const dateTo = new Date(this.date.to)
            return date > today || date > dateTo
        },
        dateToDisabled(ymd, date) {
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            const dateForm = new Date(this.date.from)
            return date > today || date <= dateForm

        }
    }
}
</script>

<style lang="scss">
.b-dropdown-form {
    max-height: 200px;
    overflow-y: scroll;
}
.filter-dropdown {
    .dropdown-menu {
        max-height: 200px;
        overflow-y: scroll;
    }
}
</style>