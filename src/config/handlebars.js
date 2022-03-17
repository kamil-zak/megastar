import { join } from 'path'
import { create } from 'express-handlebars'

const configHandlebars = (app) => {
    const hbsConfig = {
        extname: '.hbs',
        helpers: {
            ifVal(condition, value) {
                if (condition) return value
            },
        },
    }

    app.engine('hbs', create(hbsConfig).engine)
    app.set('view engine', 'hbs')
    app.set('views', join('src', 'views'))
}

export default configHandlebars
