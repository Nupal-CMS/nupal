import * as dotenv from 'dotenv'
            dotenv.config()

const __dirname = new URL('..', import.meta.url).pathname;
import { getEnabledModules } from '../../../../core/modules.js'

export const modules = async (req, res) => {
    let enabled = await getEnabledModules()
    res.twig('modules.html', { enabled })
}
