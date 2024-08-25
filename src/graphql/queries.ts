export const GET_DATA = (limit?: number) => {
  return `query getData {
  movies ${limit ? `(first: ${limit})` : null} {
    nodes {
      slug
      advanced_custom_fields {
        releaseDate
        title
        img {
          sourceUrl
        }
      }
    }
  }
  tvshows(first: ${limit}) {
    nodes {
      slug
      advanced_custom_fields {
        releaseDate
        title
        img {
          sourceUrl
        }
      }
    }
  }
}`
}

export const GET_MOVIES = () => {
  return `query getMovies {
              movies {
                  nodes {
                    slug
                    advanced_custom_fields {
                      releaseDate
                      title
                      img {
                        sourceUrl
                      }
                    }
                  }
                }
            }`
}

export const GET_TVSHOWS = () => {
  return `query GetTvshows {
    tvshows {
      nodes {
        slug
        advanced_custom_fields {
          releaseDate
          title
          img {
            sourceUrl
          }
        }
      }
    }
  }`
}
