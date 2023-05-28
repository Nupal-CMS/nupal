import yaml from 'read-yaml-file'
export const getConfig = async config => yaml(process.env.CONFIG_DIRECTORY + '/core.system.yml')
