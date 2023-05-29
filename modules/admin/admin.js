import * as dotenv from 'dotenv'
            dotenv.config()

import { getAllModules } from "../../core/modules.js";

export const index = (req, res) => {
    res.twig()
}

export const modules = async (req, res) => {
    let modules = await getAllModules()
    res.twig({ modules })
}
