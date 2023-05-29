import * as dotenv from 'dotenv'
            dotenv.config()

import { getEnabledModules } from '../../../../core/modules.js'

export const index = (req, res) => {
    res.twig()
}

export const modules = async (req, res) => {
    let enabled = await getEnabledModules()
    res.twig({ enabled })
}
