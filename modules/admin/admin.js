import * as dotenv from 'dotenv'
            dotenv.config()
export const index = (req, res) => {
    res.twig('index.html')
}
