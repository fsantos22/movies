import { Bookmarks } from '@/types/types'

export enum categoryOptions {
  MOVIES = 'movies',
  TVSHOWS = 'tvshows',
}

export const BOOKMARKS_INITIAL_STATE: Bookmarks = { movies: [], tvshows: [] }
export const BOOKMARKS_INITIAL_STATE_STRINGFIED: string = JSON.stringify(BOOKMARKS_INITIAL_STATE)
