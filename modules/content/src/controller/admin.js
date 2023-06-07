import {
    getEnabledModules,
    getAllModules,
    enableModule,
    getAllThemes,
    enableTheme
} from '../../../../core/orm.js'

export const contentTypes = async (req, res) => {
    return res.render('content.types.html', {

    })
}

export const contentTypesAdd = async (req, res) => {
    return res.render('content.types.add.html', {

    })
}
