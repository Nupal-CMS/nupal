import * as dotenv from 'dotenv'
            dotenv.config()

import path from 'node:path'
import express from 'express'
const app = express()

import { getConfig } from './config.js'
const config = await getConfig('core.system')

app.use((req, res, next) => {
    res.twig = (tpl, data = {}) => {
        let route = tpl.split('.')[0],
            slug = req.baseUrl.replace(`/${route}`, ''),
            template = config.theme.machine_name + slug + '/' + tpl + '.twig'

        return res.render(template, data)
    }

    next()
})
export default app
