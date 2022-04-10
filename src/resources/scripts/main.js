import Vue from 'vue'
import './features/reveal.js'
import './pages/timetable/timetable.js'
import './pages/gallery/gallery.js'
import './pages/contact/contact.js'

Vue.createApp({
    data() {
        return {
            isMenuVisible: false,
        }
    },
    methods: {
        menuToggle() {
            this.isMenuVisible = !this.isMenuVisible
        },
    },
}).mount('#navbar')
