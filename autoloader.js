import * as fs from 'node:fs/promises'

import _ from 'lodash'
import yaml from 'read-yaml-file'
import cluster from "./core/redis.js"
import { getEnabledModules } from './vendor/dharkflower/nupal/js/src/core/modules.js'

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import express from "express";
const app = express()

const modules = await getEnabledModules()
console.log(modules)

/*

for(let mod of modules) {

    let nodule = await import(__dirname + `/${mod}/${mod}.js`)
    let routes = await yaml(__dirname + `/${mod}/${mod}.routing.yml`)
    let middleware = await yaml(__dirname + `/${mod}/${mod}.middleware.yml`)

    for(let mid of middleware.middleware) {
        let m = await import(__dirname + `/${mod}/src/middleware/${mid}`)
        app.use(m.default)
    }

    for(let key in routes) {
        let route = routes[key]

        app.use((req, res, next) => {
            res.locals.title = route.defaults._title
            next()
        })

        app.use('/' + mod + route.path, nodule[route.defaults._controller])
    }


}

 */


export default app;
