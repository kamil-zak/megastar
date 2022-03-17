<template>
    <div class="p-timetable">
        <div class="p-timetable__label" v-if="title">{{ title }}:</div>
        <div class="p-timetable__list">
            <div
                class="p-timetable__item"
                v-for="(dep, index) in list"
                :key="dep.id"
                :class="{ 'p-timetable__item--active': dep.id === next?.id }"
                :style="{ 'animation-delay': `${index / 10}s` }"
            >
                {{ formatTime(dep) }}
            </div>
            <p class="p-direction__info" v-if="list.length === 0">BRAK</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'list', 'next'],
    methods: {
        formatTime(departure) {
            if (!departure) return 'BRAK'
            const { hours, mins, foreclosures } = departure.time
            return hours + ':' + String(mins).padStart(2, 0) + foreclosures.join('')
        },
    },
}
</script>
