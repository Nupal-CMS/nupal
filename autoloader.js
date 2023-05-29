import * as fs from 'node:fs/promises'

import _ from 'lodash'
import yaml from 'read-yaml-file'

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import express from "express";
import cluster from "./core/redis.js";
const app = express()

let ignore = ['autoloader.js']
let modules = await cluster.hgetall('modules')
    modules = _.reject(modules, o => ignore.indexOf(o) > -1)

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
export default app;
