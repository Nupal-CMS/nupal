import fs from 'node:fs/promises'
import client from './redis.js'

export const getAllThemes = async () => fs.readdir('./themes')
export const enableTheme = async theme => await client.hSet('theme', 'active', theme)
