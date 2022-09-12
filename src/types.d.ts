export interface API_RUTAS {
  getHome: string
  getAnimeInfo: (id: string) => string
  getVerAnimeId: (id: string) => string
  getUserLogin: string
  getDownloadAnime: (id: string) => string
  getSearchAnime: (search: string) => string
}
export type Iparse = (html: HTMLElement | Element,
  etiqueta: string,
  atr?: any) => string | NodeListOf<Element>

// para omitir el atr de parse
// export type NoAtrInterfaceParse = Omit<Iparse, 'atr'>
export interface IHome {
  id: string
  idNameInfo: string
  title: string
  image: string
  episode: string
}

export interface ISectionInfo {
  title: string
  img: string
  genero: string[]
  estado: string
  plusInfo: string[]
  sipnosis: string
  listadoEpisodios: string
}

export interface lisEpisodios {
  name: string
  links: string
}
export interface IGetInfoAnime {
  status: boolean
  title: string
  imagen: string
  genero: string[]
  episodios: string
  estado: string
  tipo: string
  proxEpsiodio: string | boolean
  sipnosis: string
  listadoEpisodios: lisEpisodios[]
}

export interface colPrevnext {
  link: string
}

export interface IDescriptionAnime {
  id: string
  info: string
  name: string
  description: string
  image: string
}

export interface IGetSearchAnime {
  status: boolean
  result: string
  data: IDescriptionAnime[]
  SizeSearch: number
}

export interface IDownloadAnime {
  Title: string
  Dowload: Dowload[]
}

export interface Dowload {
  link: string
  serverName: string
}
