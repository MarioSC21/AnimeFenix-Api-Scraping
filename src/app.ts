import express, { Request, Response } from 'express'
import cors from 'cors'
import config from './config'
import animeRoute from './routes/anime.routes'
import notFound from './middlewares/notFound'
import handleError from './middlewares/handleError'

const app = express()

// ? Middleware
app.use(cors())
app.use(express.json())

// ? Puerto
app.set('port', config.port)

// ? Ruta principal
app.get('/', (_: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: 'Api de la pagina de anime Anime Fenix hecho en Typescript',
    repository: 'https://github.com/MarioSC21/API-Scraper-AnimeFenix',
    endPoints: {
      latest: '/home',
      watch: '/ver/:id',
      info: '/info/:id',
      download: '/download/:id',
      search: '/search/:id'
    },
    endPointsPost: {
      info: 'colocar el nombre de usuario y password de la pagina de animefenix si desea descargar con su usuario',
      download: '/download/:id'
    }
  })
})

// ? Rutas
app.use(animeRoute)

// ? middlewares
app.use(handleError)
app.use(notFound)

export default app
