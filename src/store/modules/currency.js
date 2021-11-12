import axios from "axios";

export default {
    state: {
        data: [],
        currencies: []
    },
    mutations: {
        updateCurrencies(state, currencies) {
            state.currencies = currencies
        },
        updateData(state, data) {
            const result = []
            for (let key in data.rates) {
                let obj = {
                    'date': key,
                }
                this.state.filter.selected.forEach(e => {
                    const dateItem = data.rates[key]
                    obj = {
                        ...obj,
                        [e]: dateItem[e]
                    }
                })
                result.push(obj)
            }
            state.data = result
        }
    },
    actions: {
        async fetchCurrencies(ctx) {
            const currencies = []
            axios
                .get('https://api.frankfurter.app/currencies')
                .then(response => {
                    for (let key in response.data) {
                        currencies.push({
                            code: key,
                            name: response.data[key]
                        })
                    }
                    ctx.commit('updateCurrencies', currencies)
                })
        },
        async fetchData(ctx) {
            let params = {}
            let url = 'https://api.frankfurter.app/';
            let date = 'latest'

            if(this.state.filter.currentCurrency) {params = {from: this.state.filter.currentCurrency, ...params}}
            if(this.state.filter.selectedCurrency) {params = {to: this.state.filter.selectedCurrency.join(','), ...params}}
            if(this.state.filter.date.from.length > 0) {
                if(this.state.filter.date.from === this.state.filter.date.to) {
                    date = this.state.filter.date.from
                } else {
                    date = this.state.filter.date.from + '..' + this.state.filter.date.to
                }
            }

            axios
                .get(url+date, {params})
                .then(response => {
                    ctx.commit('updateData', response.data)
                })
        }
    },
    getters: {
        getData(state) {
            return state.data
        },
        getCurrency(state) {
            return state.currencies
        }
    }
}