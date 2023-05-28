console.log("Nupal.");

import { getConfig } from '../core/config.js'
const config = await getConfig('core.system')

// SCSS
import(`../views/${config.theme.machine_name}/scss/index.scss`)
