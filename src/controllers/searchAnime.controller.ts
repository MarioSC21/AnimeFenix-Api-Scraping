import { Request, Response, NextFunction } from 'express'
import { getSearchAnime } from '../services/searchAnime'

export const searchAnime = async (req: Request, res: Response, next: NextFunction) => {
  const { q } = req.query
  if (q === undefined) {
    return res.status(400).json({
      status: false,
      result: 'no se encontro el parametro de busqueda => revisar endpoint => /search?search=anime'
    })
  }
  try {
    const data = await getSearchAnime(q as string)
    res.status(200).send(data)
  } catch (error) {
    next(error)
  }
}
