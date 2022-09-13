import { Request, Response, NextFunction } from 'express'
import { parse, apiRutasNavigation } from '../api'
import { chromium } from 'playwright'
import boom from '@hapi/boom'
import { IDownloadAnime } from '../types'

export const DowloadAnimeUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { username, password } = req.body
  const { getDownloadAnime, getUserLogin } = apiRutasNavigation
  try {
    let animeDescargas = ''

    // ? Iniciar navegador con playwright y logearse
    const descargas = async () => {
      const browser = await chromium.launch()
      const context = await browser.newContext()
      const page = await context.newPage()
      await page.goto(getUserLogin)
      await page.type('input[id=username]', `${username as string}`)
      await page.type('input[id=password]', `${password as string}`)
      await page.click('button[id=send_button]')
      await page.waitForTimeout(5000)
      // await page.screenshot({ path: 'anime.png' })
      await page.goto(getDownloadAnime(id))
      await page.waitForTimeout(5000)

      animeDescargas = await page.content()

      await browser.close()
    }
    await descargas()

    // ? Parsear el html de la pagina de descargas y retornando un json
    const download = parse(animeDescargas)
    const downloadLinkNmae = download.querySelectorAll('.section > a').map(i => {
      const linkName = i.rawText.split(';').pop()
      return {
        linkDescargas: i.attributes.href,
        linkName
      }
    })
    const data: IDownloadAnime = {
      Title: id,
      Dowload: downloadLinkNmae.map(i => {
        return {
          link: i.linkDescargas,
          serverName: i.linkName as string
        }
      })
    }
    res.status(200).send(data)
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'coloca un usuario y contraseña validos para descargar',
      error
    })
  }
}

// ? para el metodo get
export const DowloadAnime = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { getDownloadAnime, getUserLogin } = apiRutasNavigation
  try {
    let animeDescargas = ''

    // ? Iniciar navegador con playwright y logearse
    const descargas = async () => {
      const browser = await chromium.launch()
      const context = await browser.newContext()
      const page = await context.newPage()
      await page.goto(getUserLogin)
      await page.type('input[id=username]', 'pruebaAnime')
      await page.type('input[id=password]', 'pruebaanime')
      await page.click('button[id=send_button]')
      await page.waitForTimeout(5000)
      await page.goto(getDownloadAnime(id))
      await page.waitForTimeout(5000)

      animeDescargas = await page.content()

      await browser.close()
    }
    await descargas()

    // ? Parsear el html de la pagina de descargas y retornando un json
    const download = parse(animeDescargas)
    const downloadLinkNmae = download.querySelectorAll('.section > a').map(i => {
      const linkName = i.rawText.split(';').pop()
      return {
        linkDescargas: i.attributes.href,
        linkName
      }
    })
    if (downloadLinkNmae.length > 0) {
      const data: IDownloadAnime = {
        Title: id,
        Dowload: downloadLinkNmae.map(i => {
          return {
            link: i.linkDescargas,
            serverName: i.linkName as string
          }
        })
      }
      res.status(200).send(data)
    }
    res.status(400).send(boom.notFound('coloque un id valido'))
  } catch (error) {
    next(error)
  }
}
