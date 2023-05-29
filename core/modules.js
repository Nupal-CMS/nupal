import * as fs from 'node:fs/promises'
import cluster from './redis.js'

export const getAllModules = async () => {
    return (await fs.readdir(process.env.MODULE_PATH)).filter(f => ['admin', 'autoloader.js'].indexOf(f) === -1)
}

export const getModule = async mod => {
    return cluster.hget('module', mod)
}

export const getEnabledModules = async () => {

}
