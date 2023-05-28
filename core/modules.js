import * as fs from 'node:fs/promises'

export const getAllModules = async () => {
    return await fs.readdir('../modules')
}
