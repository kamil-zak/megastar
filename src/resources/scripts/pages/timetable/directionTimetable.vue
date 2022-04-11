<template>
    <div class="p-direction">
        <div class="p-direction__points">{{ entry }} - {{ destination }}</div>
        <div v-if="nextDeparture">
            <div class="p-direction__label">Najbliższy dzisiejszy odjazd:</div>
            <div class="c-text c-text--danger">{{ formatTime(nextDeparture) }}</div>
        </div>
        <div v-if="nextDeparture">
            <div class="p-direction__label">Do odjazdu:</div>
            <div class="c-text c-text--danger">{{ remainingText }}</div>
        </div>
        <div class="c-text c-text--danger" v-else>Dzisiaj brak odjazdów</div>
        <timeList title="" :list="week" :next="nextDeparture" />
        <timeList title="Sobota" :list="saturday" :next="nextDeparture" />
        <timeList title="Niedziela" :list="sunday" :next="nextDeparture" />
    </div>
</template>

<script>
import timeList from './timeList.vue'

export default {
    components: { timeList },
    props: ['entry', 'destination', 'departures'],
    data() {
        return {
            nextDeparture: null,
            nextRemaining: 0,
        }
    },
    methods: {
        formatTime(departure) {
            if (!departure) return 'BRAK'
            return departure.time.hours + ':' + String(departure.time.mins).padStart(2, 0)
        },
        getRemaining(departure) {
            if (!departure) return 0
            const departureDate = new Date()
            const { hours, mins } = departure.time
            departureDate.setHours(hours, mins, 0)
            return departureDate.getTime() - new Date().getTime()
        },
        willLeave(departure) {
            return this.getRemaining(departure) > 0 && departure.isActive
        },
        updateNext() {
            const dayTypes = ['sunday', 'week', 'week', 'week', 'week', 'week', 'saturday']
            const type = dayTypes[new Date().getDay()]
            if (this.nextRemaining <= 0) this.nextDeparture = this.departures.filter(this.willLeave).find((x) => x.type === type)
            this.nextRemaining = this.getRemaining(this.nextDeparture)
            if (this.nextDeparture) setTimeout(this.updateNext, 1000)
        },
    },
    computed: {
        week() {
            return this.departures.filter((dep) => dep.type === 'week')
        },
        saturday() {
            return this.departures.filter((dep) => dep.type === 'saturday')
        },
        sunday() {
            return this.departures.filter((dep) => dep.type === 'sunday')
        },
        remainingText() {
            return new Date(this.nextRemaining).toISOString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
        },
    },
    mounted() {
        this.updateNext()
    },
}
</script>
