import parse from 'node-html-parser'
import axios from 'axios'
import { API_RUTAS, Iparse } from './types'

const URL_ANIME: string = 'https://www.animefenix.com'

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
}

export const apiRutasNavigation: API_RUTAS = {
  getHome: URL_ANIME,
  getAnimeInfo: Infoid => `${URL_ANIME}/${Infoid}`,
  getVerAnimeId: id => `${URL_ANIME}/ver/${id}`,
  getUserLogin: `${URL_ANIME}/user/login`,
  getDownloadAnime: id => `${URL_ANIME}/ver/${id}/descarga`,
  getSearchAnime: search => `${URL_ANIME}/animes?q=${search}`
}

export const getAxios = async (url: string = URL_ANIME) => {
  try {
    const response = await axios.get(url, { headers })
    return parse(response.data)
  } catch (error) {
    return error
  }
}

export const parseAtributes: Iparse = (html, etiqueta, atr) => {
  // return html.querySelector(etiqueta).attributes[atr as string]
  return html.querySelector(etiqueta)?.attributes[atr] as unknown as string
}
export const parseAtributesAll: Iparse = (html, etiqueta) => {
  return html.querySelectorAll(etiqueta)
}
export const parseText: Iparse = (html, etiqueta) => {
  return html.querySelector(etiqueta)?.textContent as string
  // html.querySelector(etiqueta).rawText
}

export { parse }
