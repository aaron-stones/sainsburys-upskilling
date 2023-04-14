import dotenv from 'dotenv'
import * as dynamoose from 'dynamoose'
import express, { Express } from 'express'
import UserRouter from './src/routes/user.routes'

dotenv.config()

const app: Express = express()

if (process.env.PORT === 'Development') {
  dynamoose.aws.ddb.local()
} else {
  // Set the AWS region for DynamoDB
  // Create new DynamoDB instance
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    accessKeyId: 'AKID',
    secretAccessKey: 'SECRET',
    region: 'us-east-1',
  })

  // Set DynamoDB instance to the Dynamoose DDB instance
  dynamoose.aws.ddb.set(ddb)
}

app.use(express.json())
app.use('/user', UserRouter)

export default app
