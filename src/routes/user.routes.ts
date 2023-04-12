import express from 'express'
import {
  create,
  get,
  getSingle,
  remove,
  update,
} from '../controllers/user.controller'

const PARAMS = '/:userID'

const UserRouter = express.Router()

UserRouter.get('/', get)

UserRouter.get(PARAMS, getSingle)

UserRouter.post('/', create)

UserRouter.put(PARAMS, update)

UserRouter.delete(PARAMS, remove)

export default UserRouter
