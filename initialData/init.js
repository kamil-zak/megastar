/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import 'dotenv/config'
import '../src/config/datebase.js'
import mongoose from 'mongoose'
import fs from 'fs'
import initialLines from './initialLines.js'
import initialForeclosures from './initialForeclosures.js'
import Line from '../src/models/line.js'
import Foreclosure from '../src/models/foreclosure.js'
import Album from '../src/models/album.js'
import initialAlbums from './initialAlbums.js'
import User from '../src/models/user.js'
import initialUsers from './initialUsers.js'

const initDb = async () => {
    await Line.deleteMany()
    await Foreclosure.deleteMany()
    await Album.deleteMany()
    await User.deleteMany()

    for (const foreclosure of initialForeclosures) await new Foreclosure(foreclosure).save()
    for (const line of initialLines) await new Line(line).save()
    for (const album of initialAlbums) await new Album(album).save()
    for (const user of initialUsers) await new User(user).save()

    const uploadFiles = await fs.promises.readdir('./uploads')
    for (const file of uploadFiles) await fs.promises.unlink(`./uploads/${file}`)
    const newFiles = await fs.promises.readdir('./initialData/uploads')
    for (const file of newFiles) await fs.promises.copyFile(`./initialData/uploads/${file}`, `./uploads/${file}`)

    mongoose.disconnect()
}

initDb()
