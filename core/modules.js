import * as fs from 'node:fs/promises'
import client from './redis.js'

export const getAllModules = async () => await fs.readdir('./modules')
export const getEnabledModules = async () => await client.lRange('modules', 0, -1)
