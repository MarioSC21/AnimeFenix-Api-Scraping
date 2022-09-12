import { Request, Response, NextFunction } from 'express'
import { getinfoAnime } from '../services/infoAnime'

export const infoAnime = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const data = await getinfoAnime(id)
    res.status(200).send(data)
  } catch (error) {
    next(error)
  }
}
