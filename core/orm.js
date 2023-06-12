import * as fs from 'node:fs/promises'
import client from './redis.js'
import { nodePrefix } from './constants.js'

export const getAllModules = async () => fs.readdir('./modules')
export const getEnabledModules = async () => client.lRange('modules', 0, -1)
export const enableModule = async mod => client.lPush('modules', mod)
export const disableModule = async mod => client.lRem('modules', 1, mod)
export const getAllThemes = async () => fs.readdir('./themes')
export const enableTheme = async theme => client.hSet('theme', 'active', theme)
export const getAllContentTypes = async () => client.lRange('content_types', 0, -1)
export const createContentType = async contentType => await client.lPush('content_types', contentType)
export const deleteContentType = async contentType => client.lRem('content_types', 1, contentType)
