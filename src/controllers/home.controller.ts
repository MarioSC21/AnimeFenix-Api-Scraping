import { Response, Request } from 'express'
import { getHome } from '../services/home'

export const pageHome = async (_: Request, res: Response) => {
  try {
    const home = await getHome()
    res.status(200).send(home)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      error
    })
  }
}
