import {
    getEnabledModules,
    getAllModules,
    enableModule,
    disableModule
} from '../../../../core/modules.js'

import {
    getAllThemes,
    getTheme,
    setTheme
} from '../../../../core/themes.js'

export const modules = async (req, res) => {

    const allModules = await getAllModules()
    let enabledModules = await getEnabledModules()

    if(req.method === 'POST') {

        let disable = []
        allModules.map(async mod => {
            if(!enabledModules.includes(mod)) {
                disable.push(mod)
            }
        })

        await req.client.del('modules')

        try {
            Object.keys(req.body).map(async mod => {
                await enableModule(mod)
            })
        } catch(e) {
            console.error(e)
        }
    }

    enabledModules = await getEnabledModules()
    res.render('modules.html', {
        allModules: allModules,
        enabledModules: enabledModules
    })
}

export const themes = async (req, res) => {
    const allThemes = await getAllThemes()
    res.render('themes.html', {
        allThemes
    })
}
