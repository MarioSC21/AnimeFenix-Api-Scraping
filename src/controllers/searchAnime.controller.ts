import { Request, Response, NextFunction } from 'express'
import { getSearchAnime } from '../services/searchAnime'

export const searchAnime = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const data = await getSearchAnime(id)
    res.status(200).send(data)
  } catch (error) {
    next(error)
  }
}
