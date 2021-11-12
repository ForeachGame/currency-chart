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
                    block
                    variant="primary"
                    :text="getCurrentCurrencyDropdownText"
                    class="m-2 filter-dropdown">
                    <b-dropdown-item
                        v-for="option in getCurrency"
                        :key="option.code"
                        @click="changeCurrentCurrency(option.code)"
                    >
                        {{ option.name }}
                    </b-dropdown-item>
                </b-dropdown>
                <b-dropdown
                    block
                    variant="primary"
                    :text="getSelectedDropdownText"
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
                                v-for="option in getCurrency"
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
                    v-model="dateFrom"
                    class="m-2 currency__datepicker"
                    :date-disabled-fn="dateFormDisabled"
                ></b-form-datepicker>
                <b-form-datepicker
                    id="filter__date-to"
                    v-model="dateTo"
                    class="m-2 currency__datepicker"
                    :date-disabled-fn="dateToDisabled"
                ></b-form-datepicker>
                <b-button
                    @click="fetchData"
                    :disabled="getSelected < 1"
                    variant="success"
                >Получить данные
                </b-button>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "AppFilter",
    computed: {
        ...mapGetters([
            "getCurrency",
            "getCurrentCurrency",
            "getDateFrom",
            "getDateTo",
            "getSelected",
            "getCurrentCurrencyDropdownText",
            "getSelectedDropdownText",

        ]),
        selected: {
            get() {
                return this.$store.state.filter.selected;
            },
            set(value) {
                this.$store.commit("updateSelected", value);
                this.$store.commit("updateSelectedDropdownText", value);
            }
        },
        dateFrom: {
            get() {
                return this.$store.state.filter.date.from;
            },
            set(value) {
                this.$store.commit("updateDateFrom", value);
            }
        },
        dateTo: {
            get() {
                return this.$store.state.filter.date.to;
            },
            set(value) {
                this.$store.commit("updateDateTo", value);
            }
        }
    },
    methods: {
        ...mapActions([
            "fetchCurrencies",
            "fetchData",
            "changeCurrentCurrency",
        ]),
        dateFormDisabled(ymd, date) {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const dateTo = new Date(this.dateTo);
            return date > today || date > dateTo;
        },
        dateToDisabled(ymd, date) {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const dateForm = new Date(this.dateFrom);
            return date > today || date <= dateForm;

        }
    },
    async mounted() {
        this.fetchCurrencies();
    }

};
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