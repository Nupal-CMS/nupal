import * as dotenv from 'dotenv'
dotenv.config()

import { Cluster } from 'ioredis';
let connections = []

for(let i = 1; i <= process.env.REDIS_SERVER_COUNT; i++) {

    let value = process.env['REDIS_SERVER_' + i]
        value = value.replace('redis://', '')
        value = value.replace(':6379', '')

    connections.push({
        port: 6379,
        host: value
    });
}
export default new Cluster(connections);
