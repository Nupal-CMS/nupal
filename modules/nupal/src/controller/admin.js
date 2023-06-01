import * as dotenv from 'dotenv'
            dotenv.config()

import { getEnabledModules, getAllModules } from '../../../../core/modules.js'

export const modules = async (req, res) => {
    res.render('modules.html', {
        allModules: await getAllModules(),
        enabledModules: await getEnabledModules()
    })
}
