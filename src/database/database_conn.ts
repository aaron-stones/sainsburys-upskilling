import * as dynamoose from 'dynamoose'

export const ddb = new dynamoose.aws.ddb.DynamoDB({
  region: 'eu-west-1',
})
