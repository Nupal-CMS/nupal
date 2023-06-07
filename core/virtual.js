import * as dotenv from 'dotenv'
            dotenv.config()

import path from 'node:path'
import twig from 'twig'

import express from 'express'
const app = express()

app.use((req, res, next) => {
    next()
})

app.get('/twig/virtual/:element', async (req, res) => {

    if(!req?.body?.tpl) {
        req.body = {}
        req.body.tpl = 'object'// delete this
    }

    res.locals.req = req
    await twig.renderFile(path.join(process.env.MODULE_PATH, 'twig', 'src', 'virtual', req.body.tpl + '.js.twig'), { req: req }, (err, html) => {
        if(err) throw err

        res.end(html)
    })
})

app.listen(process.env.PORT_VIRTUAL, err => {
    if(err) throw err

    console.log('virtual listening...');
})
