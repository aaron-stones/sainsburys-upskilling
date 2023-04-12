import * as dynamoose from 'dynamoose'
import { Item } from 'dynamoose/dist/Item'

export class User extends Item {
  id: string
  name: string
  email_address: string
}

export const UserModel = dynamoose.model<User>('user', {
  id: String,
  name: String,
  email_address: String,
})
