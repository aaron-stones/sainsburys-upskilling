import { Request } from 'express'
import { mockResponse } from '../__mocks__/MockResponse'
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from '../services/user.service'
import { UserType } from '../types/user.type'
import { internalServerError } from '../utils/test/constants/messages'
import { mockFunction } from '../utils/test/helpers/mocks'
import { create, getSingle, remove, update } from './user.controller'

jest.mock('../services/user.service')

const userID = 'test'

const req = {
  params: {
    userID,
  },
  body: {
    name: 'test testington',
    email_address: 'test@test.com',
  },
} as unknown as Request

const input: UserType = {
  id: 'test',
  name: 'test',
  email_address: 'test',
}

describe('User Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  describe('Get Single API Call', () => {
    it('should return a 200 response code, call the service layer once and return the correct input to client when there is a record found', async () => {
      const mock = mockFunction(getUser)

      mock.mockResolvedValue(input)

      const res = mockResponse()

      await getSingle(req, res)

      expect(getUser).toHaveBeenNthCalledWith(1, userID)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, input)
    })

    it('should return a 404 response code, call the service layer once and return the correct input to client when there is no record found', async () => {
      const mock = mockFunction(getUser)

      mock.mockResolvedValue({} as UserType)

      const res = mockResponse()

      await getSingle(req, res)

      expect(getUser).toHaveBeenNthCalledWith(1, userID)
      expect(res.status).toHaveBeenNthCalledWith(1, 404)
      expect(res.json).toHaveBeenNthCalledWith(1, {})
    })

    it('should return a 500 response code, call the service layer once and return the correct input to client when there is a server failure', async () => {
      const mock = mockFunction(getUser)

      mock.mockRejectedValue({} as UserType)

      const res = mockResponse()

      await getSingle(req, res)

      expect(getUser).toHaveBeenNthCalledWith(1, userID)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, internalServerError)
    })
  })

  describe('Create a new User API Call', () => {
    const result = {
      id: 'test',
      name: 'test testington',
      email_address: 'test@test.com',
    }

    it('should return a 201 response code, call the service layer once and return the correct input to client when there is a record created', async () => {
      const mock = mockFunction(createUser)

      mock.mockResolvedValue(result)

      const res = mockResponse()

      await create(req, res)

      expect(createUser).toHaveBeenNthCalledWith(1, req.body)
      expect(res.status).toHaveBeenNthCalledWith(1, 201)
      expect(res.json).toHaveBeenNthCalledWith(1, result)
    })

    it('should return a 500 response code, call the service layer once and return an error if the record is unable to be created', async () => {
      const mock = mockFunction(createUser)

      mock.mockRejectedValue({} as UserType)

      const res = mockResponse()

      await create(req, res)

      expect(createUser).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, internalServerError)
    })
  })

  describe('Update a User API Call', () => {
    const result = {
      id: 'test',
      name: 'test testington',
      email_address: 'test@test.com',
    }

    it('should return a 200 response code, call the service layer once and return the updated input to client when there is a record updated', async () => {
      const mock = mockFunction(updateUser)

      mock.mockResolvedValue(result)

      const res = mockResponse()

      await update(req, res)

      expect(updateUser).toHaveBeenNthCalledWith(1, req.params.userID, {
        email_address: 'test@test.com',
        name: 'test testington',
      })
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenNthCalledWith(1, result)
    })

    it('should return a 500 response code, call the service layer once and return an error if the record is unable to be updated', async () => {
      const mock = mockFunction(updateUser)

      mock.mockRejectedValue({} as UserType)

      const res = mockResponse()

      await update(req, res)

      expect(updateUser).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, internalServerError)
    })
  })

  describe('Delete a User API Call', () => {
    it('should return a 200 response code, call the service layer once and return the deleted input to client when there is a record deleted', async () => {
      const mock = mockFunction(deleteUser)

      mock.mockImplementation(jest.fn())

      const res = mockResponse()

      await remove(req, res)

      expect(deleteUser).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 200)
      expect(res.json).toHaveBeenCalledTimes(1)
    })

    it('should return a 500 response code, call the service layer once and return an error if the record is unable to be removed', async () => {
      const mock = mockFunction(deleteUser)

      mock.mockRejectedValue({} as UserType)

      const res = mockResponse()

      await remove(req, res)

      expect(deleteUser).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenNthCalledWith(1, 500)
      expect(res.json).toHaveBeenNthCalledWith(1, internalServerError)
    })
  })
})
