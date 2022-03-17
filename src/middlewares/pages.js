import { Router } from 'express'

const pages = [
    {
        name: 'O nas',
        path: '/',
        regex: /^\/$/,
        title: 'Przewozy krajowe i międzynarodowe Mega-Star.pl',
    },
    {
        name: 'Rozkład jazdy',
        path: '/rozklad-jazdy',
        regex: /^\/rozklad-jazdy\/?.*$/,
        title: 'Rozkład jazdy - Mega-Star.pl',
    },
    {
        name: 'Galeria',
        path: '/galeria',
        regex: /^\/galeria\/?$/,
        title: 'Galeria - Mega-Star.pl',
    },
    {
        name: 'Kontakt',
        path: '/kontakt',
        regex: /^\/kontakt\/?$/,
        title: 'Kontakt - Mega-Star.pl',
    },
]

const pagesMiddleware = () => {
    const router = Router()
    router.use((req, res, next) => {
        const activePage = pages.find((page) => page.regex.test(req.originalUrl))
        res.locals.pages = pages.map((page) => ({ ...page, isActive: page === activePage }))
        res.locals.title = activePage?.title || 'Mega-Star.pl'
        res.locals.isDev = process.env.NODE_ENV === 'development'
        next()
    })
    return router
}

export default pagesMiddleware
