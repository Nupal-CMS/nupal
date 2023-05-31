import * as dotenv from 'dotenv'
            dotenv.config()

import express from 'express'
const app = express()

import { getConfig } from './config.js'
const config = await getConfig('core.public')

app.use((req, res, next) => {

    res.twig = (template, data) => {

        let tpl = config.theme.machine_name + '/' + template + '.twig'
        return res.render(tpl, data)

    }

    next()
})
export default app
