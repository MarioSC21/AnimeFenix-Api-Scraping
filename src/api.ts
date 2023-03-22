import parse from 'node-html-parser'
import axios from 'axios'
import config from './config'
import { API_RUTAS, Iparse } from './types'
import HttpProxyAgent from 'http-proxy-agent/dist/agent'
import HttpsProxyAgent from 'https-proxy-agent/dist/agent'

const URL_ANIME: string = 'https://www.animefenix.tv'

// ? pagina para usar los proxys zenrows
const proxy = config.proxy
const httpAgent = new HttpProxyAgent(proxy)
const httpsAgent = new HttpsProxyAgent(proxy)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// Buscar proxys anti bot o biblioteca para evitar el bloqueo de la pagina
// const urlAntiBot = 'https://api.zenrows.com/v1/?apikey=b2ab7b5867028db2d36064fcf9e23a7296966d91&url=https%3A%2F%2Fwww.animefenix.tv%2F&antibot=true'
// const headers = {
//   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
//   Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
// }
export const apiRutasNavigation: API_RUTAS = {
  getHome: URL_ANIME,
  getAnimeInfo: Infoid => `${URL_ANIME}/${Infoid}`,
  getVerAnimeId: id => `${URL_ANIME}/ver/${id}`,
  getUserLogin: `${URL_ANIME}/user/login`,
  getDownloadAnime: id => `${URL_ANIME}/ver/${id}/descarga`,
  getSearchAnime: search => `${URL_ANIME}/animes?q=${search}`
}

export const getAxios = async (url: string = URL_ANIME) => {
  const axiosCreate = axios.create({
    httpAgent: httpAgent,
    httpsAgent: httpsAgent
  })
  try {
    const response = await axiosCreate.get(url)
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
