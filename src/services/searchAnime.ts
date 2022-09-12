import { getAxios, apiRutasNavigation, parseText, parseAtributes } from '../api'
import { IGetSearchAnime, IDescriptionAnime } from '../types'

export const getSearchAnime = async (id: string) => {
  const { getSearchAnime } = apiRutasNavigation
  const html = await getAxios(getSearchAnime(id)) as HTMLElement
  const resultSearch: IDescriptionAnime[] = Array.from(html.querySelectorAll('.list-series article')).map(i => {
    const id = (parseAtributes(i, 'h3 a', 'href') as string).split('/').pop() as string
    const name = parseText(i, 'h3 a') as string
    const image = parseAtributes(i, 'a img', 'src') as string
    const description = parseText(i, 'p') as string
    return {
      id,
      info: `/info/${id}`,
      name,
      description,
      image
    }
  })
  const data: IGetSearchAnime = {
    status: true,
    result: 'resultados de la busqueda',
    SizeSearch: resultSearch.length,
    data: resultSearch
  }
  return data
}
