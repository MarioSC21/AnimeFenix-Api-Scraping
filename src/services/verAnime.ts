import { getAxios, parseAtributes, parseText, apiRutasNavigation, parse } from '../api'
import { colPrevnext } from '../types'

export enum indiceArr {
  cero = 0,
  uno = 1,
  dos = 2
}

const colPrevNextCond = (arrayCol: colPrevnext[], indiceArray: indiceArr, splitRegla: string): string => {
  return arrayCol[indiceArray].link.split(splitRegla).pop() as unknown as string
}

export const getVerAnime = async (id: string) => {
  const { getVerAnimeId } = apiRutasNavigation
  const html = await getAxios(getVerAnimeId(id)) as HTMLElement
  const colPrevnext: colPrevnext[] = Array.from(html.querySelectorAll('.columns .column .column')).map(i => {
    return {
      link: parseAtributes(i, 'a', 'href') as string
    }
  })

  // ? logica para el prev y next del capitulo (se puede mejorar)
  const conditionalPrev = colPrevNextCond(colPrevnext, indiceArr.cero, '-')
  const conditionalNext = colPrevNextCond(colPrevnext, indiceArr.dos, '-')
  const conditionalNext1 = colPrevNextCond(colPrevnext, indiceArr.uno, '-')
  const linkPrev = colPrevNextCond(colPrevnext, indiceArr.cero, '/')
  const linkNext = colPrevNextCond(colPrevnext, indiceArr.dos, '/')
  const linkNext1 = colPrevNextCond(colPrevnext, indiceArr.uno, '/')
  const linkPrevArray = linkPrev?.split('-')
  const nameInfo = linkPrevArray?.slice(0, linkPrevArray.length - 1).join('-')
  const condPrevLink = (isNaN(+conditionalPrev)) ? `/info/${linkPrev}` : `/ver/${linkPrev}`
  const condNextLink = (isNaN(+conditionalNext)) && (isNaN(+conditionalNext1)) ? `/info/${nameInfo}` : `/ver/${isNaN(+conditionalNext) ? linkNext1 : linkNext}`

  // ? obtener videos
  const videosHtml = html.querySelector('.player-container ') as HTMLElement
  const iframeVideo = parse((parseText(videosHtml, 'script') as string).trim())

  const nombreServer = Array.from(videosHtml.querySelectorAll('ul a')).map((name, index) => {
    return {
      [index]: name.getAttribute('title')
    }
  })
  const data = {
    name: (parseText(html, '.title') as string).trim(),
    controles: {
      prev: {
        existe: !isNaN(+conditionalPrev),
        link: condPrevLink
      },
      next: {
        existe: !((isNaN(+conditionalNext)) && (isNaN(+conditionalNext1))),
        link: condNextLink
      }
    },
    Videos: iframeVideo.querySelectorAll('iframe').map((i, index) => {
      return {
        serverName: nombreServer[index][index],
        url: i.attributes.src
      }
    })
  }
  return data
}
