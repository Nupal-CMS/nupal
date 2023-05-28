console.log("Nupal.");
import * as dotenv from 'dotenv'
            dotenv.config()

import { getConfig } from '../core/config.js'
const config = await getConfig('core.system')

import(`../views/${config.theme.machine_name}/scss/index.scss`)
