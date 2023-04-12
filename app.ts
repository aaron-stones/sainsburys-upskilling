import dotenv from 'dotenv'
import * as dynamoose from 'dynamoose'
import express, { Express } from 'express'
import UserRouter from './src/routes/user.routes'

dotenv.config()

const app: Express = express()

dynamoose.aws.ddb.local()

app.use(express.json())
app.use('/user', UserRouter)

export default app
