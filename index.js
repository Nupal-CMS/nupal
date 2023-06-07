import * as dotenv from 'dotenv'
            dotenv.config()

import app from './core/app.js'
import express from 'express'
import bodyParser from 'body-parser'
import './core/virtual.js'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/public', express.static('./public'))

import autoloader from './autoloader.js'
app.use('/', autoloader)

app.listen(process.env.PORT, err => {
    if(err) throw err
    else console.log('listening...')
})
