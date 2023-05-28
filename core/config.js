import yaml from 'read-yaml-file'
import * as dotenv from 'dotenv'
            dotenv.config()
export const getConfig = async config => yaml(process.env.CONFIGURATION_PATH + '/core.system.yml')
