import * as dotenv from 'dotenv'
            dotenv.config()

const __dirname = new URL('..', import.meta.url).pathname;

import app from './core/app.js'
import Twig from 'twig'
import express from 'express'
import bodyParser from 'body-parser'

app.use(bodyParser.json())
app.use('/public', express.static('./public'))

// theme
app.engine('twig', Twig.renderFile)
app.set('view engine', 'twig')

import autoloader from './autoloader.js'
app.use('/', autoloader)

app.listen(process.env.PORT, err => {
    if(err) throw err
    else console.log('listening...')
})
