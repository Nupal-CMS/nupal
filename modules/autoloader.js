import * as fs from 'node:fs/promises'
import _ from 'lodash'
import express from "express";
const app = express.Router()

let ignore = ['autoloader.js']
let modules = await fs.readdir('./modules')
    modules = _.reject(modules, o => ignore.indexOf(o) > -1)

for(let mod of modules) {
    let route = await import(`./${mod}/app.js`)
    app.use('/' + mod, route.default)
}

export default app;
