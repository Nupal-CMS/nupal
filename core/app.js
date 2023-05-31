import * as dotenv from 'dotenv'
            dotenv.config()

import express from 'express'
const app = express()
import path from 'node:path'
import client from './redis.js'

import { getConfig } from './config.js'
const config = await getConfig('core.system')

let theme = await client.hGet('theme', 'active')
app.set('views', path.join(process.env.VIEWS_PATH, theme))

export default app
