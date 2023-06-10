import {
    getEnabledModules,
    getAllModules,
    enableModule,
    getAllThemes,
    enableTheme
} from '../../../../core/orm.js'

export const modules = async (req, res) => {

    if(req.method === 'POST') {
        await req.client.del('modules')
        Object.keys(req.body).map(async mod => await enableModule(mod))
    }

    res.render('modules.html', {
        allModules: await getAllModules(),
        enabledModules: await getEnabledModules()
    })
}

export const themes = async (req, res) => {
    if(req.method === 'POST') {
        let theme = Object.keys(req.body)[0]
        await enableTheme(theme)
        req.theme = theme
    }
    res.render('themes.html', {
        allThemes: await getAllThemes()
    })
}
