import * as fs from 'node:fs/promises'
import cluster from './redis.js'

const vendors = await fs.readdir('./vendor')
const modules = []

for(let vendor of vendors) {
    try {

        let mods = await fs.readdir('./vendor/' + vendor)
            mods.map(m => modules.push(m))

    } catch(e) {
        console.error(e)
    }
}

export const getEnabledModules = async () => {
    const modules = ['admin']

    let results = cluster.hgetall('modules')
    console.log(results)

    return results
}
