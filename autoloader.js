import * as dotenv from 'dotenv'
            dotenv.config()

const __dirname = new URL('.', import.meta.url).pathname;
import { getEnabledModules } from './core/modules.js'
const modules = await getEnabledModules()

import Twig from 'twig'
import yaml from 'read-yaml-file'
import path from 'node:path'

import express from "express"
const app = express()

// main module loader
for(let mod of modules) {
    const modRoot = path.join(__dirname, 'modules', mod)
    const _mod = await import(`${modRoot}/${mod}.js`)
    app.use(_mod.default)
}

// middleware and routes
for(let mod of modules) {
    console.log('enabling mod...', mod)

    try {
        const modRoot = path.join(__dirname, 'modules', mod)
        const info = await yaml(`${modRoot}/${mod}.info.yml`)
        app.use((req, res, next) => {
            req.info = info
            next()
        })

        if(info) {

            // middleware
            try {
                let middleware = await yaml(`${modRoot}/${mod}.middleware.yml`)
                for(let mid of middleware.middleware) {
                    const _mid = await import(`${modRoot}/src/middleware/${mid}.js`)
                    app.use(_mid.default)
                }
            } catch(e) {
                console.error(e)
            }

            // routing
            try {
                let routes = await yaml(`${modRoot}/${mod}.routing.yml`)
                for(let key in routes) {
                    let route = routes[key]

                    if(route.defaults.hasOwnProperty('_template')) {
                        app.use((req, res, next) => {
                            res.locals = Object.assign({}, res.locals, route.parameters)
                            let routePath = path.join(modRoot, 'src', 'templates', route.defaults._template + '.twig')
                            let rendered = Twig.renderFile(routePath);
                            res.end(rendered)
                        })
                    }

                    else {

                        const str = route.defaults._controller.split(':'),
                              controller = await import(`${modRoot}/src/controller/${str[0]}.js`),
                              method = controller[str[1]]

                        const slug = '/' + mod + route.path
                        app.all(slug, method)
                    }
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
