console.log('Nupal.')

import { getConfig } from '../core/config.js'
const config = await getConfig('core.public')
import './index.scss'

console.log(config)
