import { apiRutasNavigation, getAxios, parseAtributes, parseText } from '../api'
import { ISectionInfo, IGetInfoAnime } from '../types'

export const getinfoAnime = async (id: string) => {
  const { getAnimeInfo } = apiRutasNavigation
  const animeInfo = await getAxios(getAnimeInfo(id)) as HTMLElement
  const sectionInfo: ISectionInfo[] = Array.from(animeInfo.querySelectorAll('.section > .container > .columns > .column')).map(i => {
    const title = i.querySelector('.columns .column h1') !== null ? parseText(i, '.columns .column h1') as string : 'no title'
    const img = i.querySelector('figure img') !== null ? parseAtributes(i, 'figure img', 'src') as string : 'no-image'
    const sipnosis = i.querySelector('.sinopsis') !== null ? parseText(i, '.sinopsis') as string : 'no sinopsis'
    const genero = Array.from(i.querySelectorAll('.genres a')).map(i => i.textContent) as string[]
    const plusInfo = Array.from(i.querySelectorAll('ul li')).map(i => i.textContent?.trim()) as unknown as string[]
    const estado = parseText(i, 'a') as string
    const listadoEpisodios = Array.from(i.querySelectorAll('ul li')).map((i, index) => {
      return (i.querySelector('a') != null) ? { [index]: parseAtributes(i, 'a', 'href') } : 'no link'
    })
    return {
      title,
      img,
      genero,
      estado,
      plusInfo,
      sipnosis,
      listadoEpisodios: JSON.stringify(listadoEpisodios)
    }
  })
  // console.log(sectionInfo)
  const data: IGetInfoAnime = {
    status: true,
    title: sectionInfo[1].title,
    imagen: sectionInfo[0].img,
    genero: sectionInfo[1].genero,
    episodios: sectionInfo[1].plusInfo[2]?.split(':').pop()?.trim() as string,
    estado: sectionInfo[0].estado,
    tipo: sectionInfo[1].plusInfo[0]?.split(':').pop()?.trim() as string,
    proxEpsiodio: (sectionInfo[1].plusInfo[4] === null) ? false : sectionInfo[1].plusInfo[4]?.split(':').pop()?.trim() as string,
    sipnosis: sectionInfo[1].sipnosis.trim(),
    listadoEpisodios: sectionInfo[2].plusInfo.map((i, index) => {
      return {
        name: i?.trim(),
        links: `/${(JSON.parse(sectionInfo[2].listadoEpisodios) as string[])[index][index].split('/').splice(3).join('/')}`
      }
    }).reverse()
  }
  return data
}
