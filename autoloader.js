import * as dotenv from 'dotenv'
            dotenv.config()

import yaml from 'read-yaml-file'
import path from 'node:path'
import twig from 'twig'
import { getEnabledModules } from './core/modules.js'

import express from "express"
const router = express.Router()

const modules = await getEnabledModules()
for(let mod of modules) {
    console.log('enabling mod...', mod)

    try {
        const modRoot = './modules/' + mod
        const info = await yaml(`${modRoot}/${mod}.info.yml`)

        if(info) {

            // middleware
            try {
                let middleware = await yaml(`${modRoot}/${mod}.middleware.yml`)
                for(let mid of middleware.middleware) {
                    const _mid = await import(`${modRoot}/src/middleware/${mid}.js`)
                    router.use(_mid.default)
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
                        router.use((req, res, next) => {
                            res.locals = Object.assign({}, res.locals, route.parameters)
                            let routePath = path.join(modRoot, 'src', 'templates', route.defaults._template + '.twig')
                            return res.render(routePath);
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
