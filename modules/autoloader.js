import * as fs from 'node:fs/promises'

import _ from 'lodash'
import yaml from 'read-yaml-file'

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import express from "express";
const app = express.Router()

let ignore = ['autoloader.js']
let modules = await fs.readdir('./modules')
    modules = _.reject(modules, o => ignore.indexOf(o) > -1)

for(let mod of modules) {

    let pod = await import(__dirname + `/${mod}/${mod}.js`)
    let routes = await yaml(__dirname + `/${mod}/${mod}.routing.yml`)

    for(let key in routes) {
        let route = routes[key]
        let _controller = route.defaults._controller,
            controller = _controller.split(':')[1],
            title = route.defaults._title

        app.use('/' + mod + route.path, pod[controller])
    }

}
export default app;
