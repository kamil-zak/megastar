import Vue from 'vue'
import directionTimetable from './directionTimetable.vue'
import { isExcluded } from './helpers.js'

const timetableSelector = '#timetable'

const timetableApp = Vue.createApp({
    components: { directionTimetable },
    data() {
        return {
            line: null,
            foreclosures: [],
            status: {
                isLoading: true,
                isLoaded: false,
                isError: false,
            },
        }
    },
    async mounted() {
        this.load()
    },
    methods: {
        async load() {
            this.status.isLoading = true
            this.status.isError = false
            const { id } = document.querySelector(timetableSelector).dataset
            const linePromise = fetch(`/api/lines/${id}`).then((resp) => resp.json())
            const foreclosuresPromise = fetch(`/api/foreclosures`).then((resp) => resp.json())
            await new Promise((resolve) => setTimeout(resolve, 1000))
            Promise.all([linePromise, foreclosuresPromise])
                .then(([line, foreclosures]) => {
                    this.line = line
                    this.foreclosures = foreclosures
                    this.status.isLoaded = true
                })
                .catch(() => {
                    this.status.isError = true
                })
                .finally(() => {
                    this.status.isLoading = false
                })
        },
        isActive(departure) {
            return departure.time.foreclosures.every((x) => !this.excludedSymbols.includes(x))
        },
    },
    computed: {
        usedForeclosures() {
            return this.foreclosures.filter((foreclosure) =>
                this.line.timetable.some((dep) => dep.time.foreclosures.includes(foreclosure.symbol))
            )
        },
        excludedSymbols() {
            return this.foreclosures.filter(isExcluded).map((foreclosure) => foreclosure.symbol)
        },
        toDestinationDepartures() {
            if (!this.line) return []
            return this.line.timetable
                .filter((dep) => dep.direction === 'destination')
                .map((dep) => ({ ...dep, isActive: this.isActive(dep) }))
        },
        toEntryDepartures() {
            if (!this.line) return []
            return this.line.timetable.filter((dep) => dep.direction === 'entry').map((dep) => ({ ...dep, isActive: this.isActive(dep) }))
        },
    },
})

if (document.querySelector(timetableSelector)) timetableApp.mount(timetableSelector)
