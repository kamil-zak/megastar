import Vue from 'vue'
import cacheImage from '../../utils/cacheImage.js'

const gallerySelector = '#gallery'

const galleryApp = Vue.createApp({
    data() {
        return {
            photos: [],
            selectedIndex: 0,
            isLoaded: false,
            isOpen: false,
            isImageLoading: false,
        }
    },
    methods: {
        async load(id) {
            this.isOpen = true
            try {
                const album = await fetch(`api/albums/${id}`).then((resp) => resp.json())
                this.photos = album.photos
                await cacheImage(`/files/${album.photos[0]}`)
                this.isLoaded = true
            } catch {
                this.close()
            }
        },
        select(index) {
            if (!this.photos[index]) return

            this.isImageLoading = true
            cacheImage(`/files/${this.photos[index]}`)
                .then(() => {
                    this.isImageLoading = false
                    this.selectedIndex = index
                })
                .catch(() => {
                    this.isImageLoading = false
                })
        },
        selectNext() {
            this.select(this.selectedIndex + 1)
        },
        selectPrevious() {
            this.select(this.selectedIndex - 1)
        },
        close() {
            this.isOpen = false
            this.isLoaded = false
            this.photos = []
            this.selectedIndex = 0
        },
        handleTouchStart(e) {
            this.touchstartX = e.changedTouches[0].screenX
        },
        handleTouchEnd(e) {
            if (e.changedTouches[0].screenX > this.touchstartX) this.select(this.selectedIndex - 1)
            if (e.changedTouches[0].screenX < this.touchstartX) this.select(this.selectedIndex + 1)
        },
        updateVh() {
            document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
        },
    },
    watch: {
        isOpen(open) {
            if (open) {
                window.addEventListener('resize', this.updateVh)
                this.updateVh()
            } else window.removeEventListener('resize', this.updateVh)
        },
    },
    computed: {
        selectedPhotoUrl() {
            return `/files/${this.photos[this.selectedIndex]}`
        },
        thumbUrls() {
            return this.photos.map((photo) => `/files/thumb.${photo}`)
        },
    },
})

if (document.querySelector(gallerySelector)) galleryApp.mount(gallerySelector)
