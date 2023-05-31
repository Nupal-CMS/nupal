import * as dotenv from 'dotenv'
            dotenv.config()

import { getEnabledModules } from '../../../../core/modules.js'

export const index = async (req, res) => {
    res.twig('nupal/index.html')
}

export const modules = async (req, res) => {
    let enabled = await getEnabledModules()
    res.twig('nupal/modules.html', { enabled })
}
