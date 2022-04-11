import Vue from 'vue'

const contactSelector = '#contact'

const contactApp = Vue.createApp({
    data() {
        return {
            from: '',
            message: '',
            validationMessage: '',
            isSending: false,
            isSuccess: false,
            isError: false,
        }
    },
    methods: {
        validate() {
            this.validationMessage = ''
            if (this.message.length < 10) {
                this.validationMessage = 'Minimalna długość wiadomości to 10 znaków'
                return false
            }
            return true
        },
        send() {
            if (!this.validate()) return
            this.isSending = true
            fetch(`api/sendmail`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ from: this.from, message: this.message }),
            })
                .then((response) => {
                    if (response.ok) this.isSuccess = true
                    else this.isError = true
                })
                .catch(() => {
                    this.isError = true
                })
        },
    },
})

if (document.querySelector(contactSelector)) contactApp.mount(contactSelector)
