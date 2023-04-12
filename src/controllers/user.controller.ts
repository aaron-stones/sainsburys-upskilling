import { Request, Response } from 'express'
import { UserDto } from '../dtos/user.dto'
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from '../services/user.service'
import { internalServerError } from '../utils/constants/messages'

export const getSingle = async (req: Request, res: Response) => {
  const id = req.params.userID

  try {
    const result = await getUser(id)

    if (!result.id) {
      console.error(`Unable to find record ${id}`)

      res.status(404).json(result)
    }

    res.status(200).json(result)
  } catch (e) {
    console.error(`Unable to find record ${id} because of a server error`, e)

    res.status(500).json(internalServerError)
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const newUser: UserDto = req.body
    const result = await createUser(newUser)

    res.status(201).json(result)
  } catch (e) {
    console.error('Unable to create record', e)

    res.status(500).json(internalServerError)
  }
}

export const update = async (req: Request, res: Response) => {
  const id = req.params.userID

  try {
    const updatedResult: UserDto = req.body
    const result = await updateUser(id, updatedResult)

    res.status(200).json(result)
  } catch (e) {
    console.error(`Unable to update record ${id}`, e)

    res.status(500).json(internalServerError)
  }
}

export const remove = async (req: Request, res: Response) => {
  const id = req.params.userID

  try {
    const result = await deleteUser(id)

    res.status(200).json(result)
  } catch (e) {
    console.error(`Unable to delete record ${id}`, e)

    res.status(500).json(internalServerError)
  }
}
