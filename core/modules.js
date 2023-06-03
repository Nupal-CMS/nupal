import * as fs from 'node:fs/promises'
import client from './redis.js'

export const getAllModules = async () => fs.readdir('./modules')
export const getEnabledModules = async () => client.sMembers('modules')
