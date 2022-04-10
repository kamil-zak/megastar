const items = Array.from(document.querySelectorAll('[data-reveal]'))
const reveal = () => {
    items.forEach((item) => {
        const elementTop = item.getBoundingClientRect().top
        if (elementTop < window.innerHeight - 150) item.classList.add('active')
    })
}
document.addEventListener('scroll', reveal)
reveal()
