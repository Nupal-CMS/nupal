import * as dotenv from 'dotenv'
            dotenv.config()

import { createClient } from 'redis'
const client = createClient({
    url: process.env.REDIS_URL
})

await client.connect()
export default client
