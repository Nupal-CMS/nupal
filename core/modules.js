import * as fs from 'node:fs/promises'
import { getConfig } from "./config.js";
const config = await getConfig('core.system')
export const getAllModules = async () => {
    return (await fs.readdir(config.module.path)).filter(f => ['admin', 'autoloader.js'].indexOf(f) === -1)
}
