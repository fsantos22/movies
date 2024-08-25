import { graphqlRequest } from '@/lib/graphqlRequest'
import { Data } from '@/types/types'
import { create } from 'zustand'

type State = {
  movies: Data[]
  tvshows: Data[]
  isLoading: boolean
  error: unknown
}

type Actions = {
  fetchData: (queryString: string) => Promise<void>
}

const INITIAL_STATE: State = {
  movies: [],
  tvshows: [],
  isLoading: false,
  error: null,
}

export const useFetch = create<State & Actions>((set) => ({
  movies: INITIAL_STATE.movies,
  tvshows: INITIAL_STATE.tvshows,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  fetchData: async (queryString) => {
    try {
      set({ isLoading: true, error: null })
      const query = {
        query: queryString,
      }
      const resJson = await graphqlRequest(query)
      const allData = resJson?.data
      const allMovies = allData?.movies?.nodes
      const allTvshows = allData?.tvshows?.nodes
      set({ movies: allMovies, tvshows: allTvshows, isLoading: false })
    } catch (error) {
      set({ error, isLoading: false })
    }
  },
}))
