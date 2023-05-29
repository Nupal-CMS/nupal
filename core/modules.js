import * as fs from 'node:fs/promises'
export const getAllModules = async () => {
    return (await fs.readdir(process.env.MODULE_PATH)).filter(f => ['admin', 'autoloader.js'].indexOf(f) === -1)
}
