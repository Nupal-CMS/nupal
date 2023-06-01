import express from 'express'
const app = express()
import twig from 'twig'
import client from '../../core/redis.js'
import { getConfig } from '../../core/config.js'
import path from 'node:path'

app.use(async (req, res, next) => {
    req.client = client
    req.theme = await client.hGet('theme', 'active')
    req.config = await getConfig('core.system')

    res.twig = (tpl, data) => {
        return res.render(path.join(process.env.MODULE_PATH, req.info.name, 'src', 'templates/') + tpl + '.twig')
    }

    next()
})

export default app
