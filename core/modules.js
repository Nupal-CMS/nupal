import * as fs from 'node:fs/promises'
import cluster from './redis.js'

export const getAllModules = async () => await fs.readdir('./modules')
export const getEnabledModules = async () => cluster.lrange('modules', 0, -1)
