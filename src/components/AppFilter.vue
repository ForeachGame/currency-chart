<template>
    <div>
        <b-navbar
            toggleable="lg"
            type="dark"
            variant="info">
            <b-collapse
                class="flex-xl-row justify-content-center"
                is-nav
            >
                <b-dropdown
                    v-on="{show: options.length < 1 ? getCurrency : ()=>{}}"
                    block
                    variant="primary"
                    :text="currentCurrencyDropdownText"
                    class="m-2 filter-dropdown">
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
                    variant="primary"
                    :text="selectedDropdownText"
                    class="m-2 filter-dropdown"
                >

                        <b-form-group

                            class="p-2"
                        >
                            <b-form-checkbox-group
                                id="checkbox-group-2"
                                v-model="selected"
                                name="flavour-2"
                            >
                                <b-form-checkbox
                                    v-for="option in options"
                                    :key="option.code"
                                    :value="option.code"
                                    name="flavour-3a"
                                    size="sm"
                                >
                                    {{ option.name }}
                                </b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>

                </b-dropdown>
                <b-form-datepicker
                    id="filter__date-from"
                    v-model="date.from"
                    class="m-2 currency__datepicker"
                    :date-disabled-fn="dateFormDisabled"
                ></b-form-datepicker>
                <b-form-datepicker
                    id="filter__date-to"
                    v-model="date.to"
                    class="m-2 currency__datepicker"
                    :date-disabled-fn="dateToDisabled"
                ></b-form-datepicker>
                <b-button
                    @click="$emit('get-data')"
                    :disabled="selected.length < 1"
                    variant="success"
                >Получить данные</b-button>
            </b-collapse>
        </b-navbar>
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
.form-group {
    white-space: nowrap;
    input {
        margin-right: 5px;
    }
}
.filter-dropdown {
    & > button {
        width: 200px;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .dropdown-menu {
        max-height: 200px;
        overflow-y: scroll;
    }
}
.currency__datepicker {
    max-width: 350px;
}
</style>