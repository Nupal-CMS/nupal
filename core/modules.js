import * as fs from 'node:fs/promises'
import client from './redis.js'

export const getAllModules = async () => fs.readdir('./modules')
export const getEnabledModules = async () => client.lRange('modules', 0, -1)
export const enableModule = async mod => client.lPush('modules', mod)
export const disableModule = async mod => client.lRem('modules', mod, -1)
