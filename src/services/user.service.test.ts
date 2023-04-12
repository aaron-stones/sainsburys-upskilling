import { randomUUID } from 'crypto'
import { UserDto } from '../dtos/user.dto'
import { User, UserModel } from '../models/user.model'
import { mockFunction } from '../utils/test/helpers/mocks'
import { createUser, deleteUser, getUser, updateUser } from './user.service'

jest.mock('../models/user.model')
jest.mock('crypto')

const user = {
  id: 'test',
  name: 'test',
  email_address: 'test',
} as User

const id = 'test-test-test-test-test'

describe('User Service Class', () => {
  it('should call the model class once with the ID and return an instance of User for the getUser function', async () => {
    const mockGetFunction = mockFunction(UserModel.get)

    mockGetFunction.mockResolvedValue(user as never)

    const result = await getUser('test')

    expect(mockGetFunction).toHaveBeenNthCalledWith(1, 'test')
    expect(result).toStrictEqual({
      email_address: 'test',
      id: 'test',
      name: 'test',
    })
  })

  it('should call the model class once with the UserDto and return an instance of User for the createUser function', async () => {
    const userDto: UserDto = {
      name: 'test',
      email_address: 'test@test.com',
    }

    const expectedResult = {
      id,
      ...userDto,
    }

    const mockCreateFunction = mockFunction(UserModel.create)
    mockCreateFunction.mockResolvedValue({ id, ...userDto } as never)
    mockFunction(randomUUID).mockReturnValue(id)

    const result = await createUser(userDto)

    expect(mockCreateFunction).toHaveBeenNthCalledWith(1, expectedResult)
    expect(result).toStrictEqual(expectedResult)
  })

  it('should call the model class once with the UserDto and return an instance of User for the updateUser function', async () => {
    const userDto: UserDto = {
      name: 'test',
      email_address: 'test@test.com',
    }

    const expectedResult = {
      id,
      ...userDto,
    }

    const mockUpdateFunction = mockFunction(UserModel.update)
    mockUpdateFunction.mockResolvedValue({ id, ...userDto } as never)

    const result = await updateUser(id, userDto)

    expect(mockUpdateFunction).toHaveBeenNthCalledWith(1, id, userDto)
    expect(result).toStrictEqual(expectedResult)
  })

  it('should call the model class once with the id and remove an instance of User', async () => {
    const mockUpdateFunction = mockFunction(UserModel.delete)
    mockUpdateFunction.mockImplementation(() => jest.fn())

    await deleteUser(id)

    expect(mockUpdateFunction).toHaveBeenNthCalledWith(1, id)
  })
})
