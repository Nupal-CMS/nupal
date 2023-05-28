import * as dotenv from 'dotenv'
            dotenv.config()

import express from 'express'
const app = express()

import { getConfig } from './config.js'
const config = await getConfig('core.system')

app.use((req, res, next) => {

    res.twig = async (data = {}) => {

        let template, arg = req.baseUrl.split('/').filter(s => s !== '')
        if(arg.length === 1) {
            template = config.theme.machine_name + '/' + arg[0] + '/index.html.twig'
        } else {
            template = config.theme.machine_name + '/' + arg.join('/') + '.html.twig'
        }

        return res.render(template, data)
    }

    next()
})
export default app
