/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express'
import webpack from 'webpack'
import reload from 'reload'
import chokidar from 'chokidar'
import { join } from 'path'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../webpack.config.cjs'

const paths = [join('src', 'views'), join('src', 'resources', 'scripts')]

const dev = () => {
    const webpackRouter = Router()
    reload(webpackRouter).then((reloader) => {
        chokidar.watch(paths).on('all', reloader.reload)
    })
    const compiler = webpack(webpackConfig)
    webpackRouter.use(
        devMiddleware(compiler, {
            stats: false,
            publicPath: webpackConfig.output.publicPath,
        })
    )
    webpackRouter.use(hotMiddleware(compiler))
    return webpackRouter
}

export default dev
