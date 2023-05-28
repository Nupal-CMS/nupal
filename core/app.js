import * as dotenv from 'dotenv'
            dotenv.config()

import yaml from 'read-yaml-file'

import express from 'express'
const app = express()

import { getConfig } from './config.js'
const config = await getConfig('core.system')

app.use((req, res, next) => {
    //let arg = req.baseUrl.split('/').filter(s => s !== '')

    res.twig = async (data = {}) => {
        let template = config.theme.machine_name + '/' + req.baseUrl + '/index.html.twig'
        return res.render(template, data)
    }

    next()
})
export default app
