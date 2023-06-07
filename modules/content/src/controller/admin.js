import {
    getEnabledModules,
    getAllModules,
    enableModule,
    getAllThemes,
    enableTheme,
    getAllContentTypes,
    createContentType,
    deleteContentType
} from '../../../../core/orm.js'

export const contentTypes = async (req, res) => {
    return res.render('content.types.html', {
        contentTypes: await getAllContentTypes()
    })
}

export const contentTypesAdd = async (req, res) => {

    if(req.method === 'POST') {
        await createContentType(req.body.machine_name)
    }

    return res.render('content.types.add.html', {

    })
}
