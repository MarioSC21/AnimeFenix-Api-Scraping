import { Request, Response, NextFunction } from 'express'
import { getVerAnime } from '../services/verAnime'

export const verAnime = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const data = await getVerAnime(id)
    res.status(200).send(data)
  } catch (error) {
    next(error)
  }
}
