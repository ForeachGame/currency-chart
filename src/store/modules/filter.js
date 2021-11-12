export default {
    state: {
        currentCurrency: '',
        selected: [],
        date: {
            from: '',
            to: ''
        },
        currentCurrencyDropdownText: 'Основная валюта',
        selectedDropdownText: 'Валюты для фильтра',
    },
    mutations: {
        updateCurrentCurrency(state, currentCurrency) {
            state.currentCurrency = currentCurrency
        },
        updateDateFrom(state, dateFrom) {
            state.date.from = dateFrom
        },
        updateDateTo(state, dateTo) {
            state.date.to = dateTo
        },
        updateSelected(state, selected) {
            state.selected = selected
        },
        updateCurrentCurrencyDropdownText(state, value) {
            state.currentCurrencyDropdownText = value.length > 0
                                                    ? value
                                                    : 'Основная валюта'
        },
        updateSelectedDropdownText(state, value) {
            state.selectedDropdownText = value.length > 0
                                            ? value.join(', ')
                                            : 'Валюты для фильтра'
        }
    },
    actions: {
        changeCurrentCurrency({commit}, value) {
            commit('updateCurrentCurrency', value)
            commit('updateCurrentCurrencyDropdownText', value)
        },
    },
    getters: {
        getCurrentCurrency(state) {
            return state.currentCurrency
        },
        getDateFrom(state) {
            return state.date.from
        },
        getDateTo(state) {
            return state.date.to
        },
        getSelected(state) {
            return state.selected
        },
        getCurrentCurrencyDropdownText(state) {
            return state.currentCurrencyDropdownText
        },
        getSelectedDropdownText(state) {
            return state.selectedDropdownText
        }
    }
}