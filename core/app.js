import * as dotenv from 'dotenv'
            dotenv.config()

const __dirname = new URL('..', import.meta.url).pathname;

import express from 'express'
const app = express()
import path from 'node:path'
import client from './redis.js'

import { getConfig } from './config.js'
const config = await getConfig('core.system')

let theme = await client.hGet('theme', 'active')
app.set('views', path.join(__dirname, '..', 'themes', theme))

export default app
