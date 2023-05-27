import * as dotenv from 'dotenv'
dotenv.config()

import { uuid } from 'uuidv4'
import randomWords from 'random-words'
import { SingleBar, Presets } from 'cli-progress'

import cluster from './lib/redis.js'
//import { Client } from 'redis-om'
//const client = await new Client().open(process.env.REDIS_URL)

import express from 'express'
import bodyParser from 'body-parser'
import admin from './core/admin.js'

const app = express()
      app.use(bodyParser.json())


app.use('/admin', admin)



app.listen(process.env.PORT, err => {
    if(err) throw err
    else console.log('yeah')
})
