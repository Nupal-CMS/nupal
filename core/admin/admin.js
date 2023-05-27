import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import bodyParser from 'body-parser';

const admin = express()
      admin.use(bodyParser.json())



export default admin;
