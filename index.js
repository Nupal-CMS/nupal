import * as dotenv from 'dotenv'
            dotenv.config()

import Twig from 'twig'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
      app.use(bodyParser.json())
      app.use('/public', express.static('./public'))

app.engine('twig', Twig.renderFile)
app.set('view engine', 'twig')

import autoloader from './modules/autoloader.js'
app.use('/', autoloader)

app.listen(process.env.PORT, err => {
    if(err) throw err
    else console.log('yeah')
})
