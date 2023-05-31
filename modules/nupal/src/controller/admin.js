import * as dotenv from 'dotenv'
            dotenv.config()

import { getEnabledModules } from '../../../../core/modules.js'

export const modules = async (req, res) => {
    let enabled = await getEnabledModules()
    res.render('modules.html.twig', { enabled })
}
