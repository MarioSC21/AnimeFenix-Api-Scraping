import { Request, Response, NextFunction } from 'express'
import boom from '@hapi/boom'

export default (error: string, req: Request, res: Response, next: NextFunction) => {
  if (error !== '') {
    res.status(400).send({
      status: false,
      Error: boom.notFound('Coloque una id valida')
    })
  } else {
    res.status(500).end()
  }
}
