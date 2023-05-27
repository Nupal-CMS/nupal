import * as dotenv from 'dotenv'
            dotenv.config()

import Twig from 'twig'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
      app.use(bodyParser.json())

app.engine('twig', Twig.renderFile)
app.set('view engine', 'twig')

import admin from './modules/admin/app.js'
app.use(admin)

import autoloader from './modules/autoloader.js'
app.use(autoloader)

app.listen(process.env.PORT, err => {
    if(err) throw err
    else console.log('yeah')
})
