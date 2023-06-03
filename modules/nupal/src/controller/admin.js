import * as dotenv from 'dotenv'
            dotenv.config()

import {
    getEnabledModules,
    getAllModules
} from '../../../../core/modules.js'

export const modules = async (req, res) => {
    let allModules = await getAllModules()
    let enabledModules = await getEnabledModules()

    res.render('modules.html', {
        allModules,
        enabledModules
    })
}
