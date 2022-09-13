import { Router } from 'express'
import { pageHome } from '../controllers/home.controller'
import { infoAnime } from '../controllers/infoAnime.controllers'
import { verAnime } from '../controllers/verAnime.controller'
import { searchAnime } from '../controllers/searchAnime.controller'
import { DowloadAnime, DowloadAnimeUser } from '../controllers/download.controleer'

const router = Router()

router.get('/home', pageHome)
router.get('/ver/:id', verAnime)
router.get('/info/:id', infoAnime)
router.get('/search', searchAnime)
router.get('/download/:id', DowloadAnime)
router.post('/download/:id', DowloadAnimeUser)

export default router
