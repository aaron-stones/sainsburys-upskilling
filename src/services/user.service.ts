import { randomUUID } from 'crypto'
import { UserDto } from '../dtos/user.dto'
import { UserModel } from '../models/user.model'
import { UserType } from '../types/user.type'

export const getUser = async (id: string): Promise<UserType> => {
  return await UserModel.get(id)
}

export const createUser = async (user: UserDto): Promise<UserType> => {
  const newUser: UserType = {
    id: randomUUID(),
    ...user,
  }
  return await UserModel.create(newUser)
}

export const updateUser = async (
  id: string,
  user: UserDto
): Promise<UserType> => {
  return await UserModel.update(id, user)
}

export const deleteUser = async (id: string): Promise<void> => {
  await UserModel.delete(id)
}
