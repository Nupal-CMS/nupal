import * as fs from 'node:fs/promises'

import yaml from 'read-yaml-file'
import { getEnabledModules } from './core/modules.js'

import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))

import express from "express"
const app = express()

const modules = await getEnabledModules()
for(let mod of modules) {
    console.log('enabling mod...', mod)

    try {
        const modRoot = './modules/' + mod
        const info = await yaml(`${modRoot}/nupal.info.yml`)

        if(info) {

            // middleware
            try {
                let middleware = await yaml(`${modRoot}/nupal.middleware.yml`)
                for(let mid of middleware.middleware) {
                    const _mid = await import(`${modRoot}/src/middleware/${mid}.js`)
                    app.use('/', _mid.default)
                }
            } catch(e) {
                console.error(e)
            }

            // routing
            try {
                let routes = await yaml(`${modRoot}/nupal.routing.yml`)
                for(let key in routes) {
                    let route = routes[key]

                    const str = route.defaults._controller.split(':'),
                          controller = await import(`${modRoot}/src/controller/${str[0]}.js`),
                          method = controller[str[1]]

                    app.use((req, res, next) => {
                        res.locals.title = route.defaults._title
                        next()
                    })

                    const slug = '/' + mod + route.path
                    app.use(slug, method)
                }

            } catch(e) {
                console.error(e)
            }
        }

    } catch(e) {
        console.error(e)
    }
}

export default app
