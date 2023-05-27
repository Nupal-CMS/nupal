import * as fs from 'node:fs/promises'
import express from "express";

const router = express.Router()
let ignore = ['admin', 'autoloader.js']
let modules = ( await fs.readdir('./modules'))
    .filter(i => ignore.indexOf(i) === -1)
    .map(async m => {
        router.use( await import(`./modules/${m}/app.js`))
    })

export default router;
