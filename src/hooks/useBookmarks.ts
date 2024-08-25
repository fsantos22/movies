import { Data } from '@/types/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  bookmarks: { movies: Data[]; tvshows: Data[] }
}

type Actions = {
  updateBookmarks: (newState: State['bookmarks']) => void
}

const INITIAL_STATE: State = {
  bookmarks: { movies: [], tvshows: [] },
}

export const useBookmarks = create(
  persist<State & Actions>(
    (set) => ({
      bookmarks: INITIAL_STATE.bookmarks,
      updateBookmarks: (newState) => set({ bookmarks: newState }),
    }),
    {
      name: 'bookmarks',
    },
  ),
)
