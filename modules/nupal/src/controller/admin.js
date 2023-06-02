import * as dotenv from 'dotenv'
            dotenv.config()

import {
    getEnabledModules,
    getAllModules
} from '../../../../core/modules.js'

export const modules = async (req, res) => {

    console.log('req.body: ', req.body)
    console.log('req.theme: ', req.theme)
    console.log('req.info: ', req.info)
    console.log('req.config: ', req.config)
    console.log('req.routing: ', req.routing)

    res.render('modules.html', {
        allModules: await getAllModules(),
        enabledModules: await getEnabledModules()
    })
}
