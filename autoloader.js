import * as dotenv from 'dotenv'
            dotenv.config()

const __dirname = new URL('.', import.meta.url).pathname;
import { getEnabledModules } from './core/modules.js'
const modules = await getEnabledModules()

import yaml from 'read-yaml-file'
import path from 'node:path'

import express from "express"
const router = express.Router()

// main module loader
for(let mod of modules) {
    const modRoot = path.join(__dirname, 'modules', mod)
    const _mod = await import(`${modRoot}/${mod}.js`)
    router.use(_mod.default)
}

// middleware and routes
for(let mod of modules) {
    console.log('enabling mod...', mod)

    try {
        const modRoot = path.join(__dirname, 'modules', mod)
        const info = await yaml(`${modRoot}/${mod}.info.yml`)
        if(info) {

            // middleware
            try {
                router.use((req, res, next) => {
                    req.info = info
                    next()
                })
            } catch(e) {
                console.error(e)
            }

            // middleware
            try {
                let middleware = await yaml(`${modRoot}/${mod}.middleware.yml`)

                for(let mid of middleware.middleware) {

                    console.log('middleware: ', mid)

                    const _mid = await import(`${modRoot}/src/middleware/${mid}.js`)
                    const middleware = await _mid.default(mod);

                    router.use(middleware)
                }

            } catch(e) {
                console.error(e)
            }

            // routing
            try {
                let routes = await yaml(`${modRoot}/${mod}.routing.yml`)
                for(let key in routes) {
                    let route = routes[key]

                    // tiny middleware
                    router.use((req, res, next) => {
                        req.routing = route
                        next()
                    })

                    if(route.defaults.hasOwnProperty('_template')) {
                        router.all(path.join('/', mod, route.path), async (req, res, next) => {
                            res.render(route.defaults._template, {}, (err, html) => {
                                if(err) console.error('_template error:', err)
                                res.end(html)
                            })
                        })
                    }

                    else {

                        const str = route.defaults._controller.split(':'),
                              controller = await import(`${modRoot}/src/controller/${str[0]}.js`),
                              method = controller[str[1]]

                        const slug = '/' + mod + route.path
                        router.all(slug, method)
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

export default router
