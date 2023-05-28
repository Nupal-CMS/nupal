import * as dotenv from 'dotenv'
            dotenv.config()

import path from 'node:path'
import express from 'express'
const app = express()

import { getConfig } from './config.js'
const config = await getConfig('core.system')

app.use((req, res, next) => {
    res.twig = (tpl, data = {}) => {
        let slug = path.basename(req.baseUrl)
        return res.render(config.theme.machine_name + '/' + slug + '/' + tpl + '.twig', data)
    }

    next()
})
export default app
