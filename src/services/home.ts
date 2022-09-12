import { getAxios, parseAtributes, parseText } from '../api'
import { IHome } from '../types'

export const getHome = async () => {
  const html = await getAxios() as HTMLElement
  const home: IHome[] = Array.from(html.querySelectorAll('.capitulos-grid .item')).map(i => {
    const id = (parseAtributes(i, 'a', 'href') as string).split('/').pop() as string
    const idNameInfo = id.split('-')
    const title = parseText(i, '.overtitle ') as string
    const image = parseAtributes(i, 'a img', 'src') as string
    const episode = (parseText(i, '.overepisode ') as string).split(' ').pop() as string
    return {
      id,
      idNameInfo: `${idNameInfo.filter((_, index) => index !== idNameInfo.length - 1).join('-')}`,
      title,
      image,
      episode
    }
  })
  return home
}
