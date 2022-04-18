const callback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active')
    })
}

const observer = new IntersectionObserver(callback, {
    rootMargin: '-100px',
    threshold: 0,
})

document.querySelectorAll('[data-reveal]').forEach((item) => observer.observe(item))
