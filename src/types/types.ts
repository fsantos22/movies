export type Data = {
  slug: string
  advanced_custom_fields: {
    releaseDate: string
    title: string
    img: {
      sourceUrl: string
    }
  }
}

export type Bookmarks = {
  movies: Data[]
  tvshows: Data[]
}

export type MenuItem = {
  label: string
  icon: JSX.Element
  link: string
}

export type CardComponentProps = {
  item: Data
  bookmarked: boolean
  category: string
}
