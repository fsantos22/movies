import { Bookmarks, Data } from '@/types/types'
import { categoryOptions } from './constraints'

export const checkBookmark = (bookmarks: Bookmarks, targetItem: Data, category: categoryOptions) => {
  switch (category) {
    case categoryOptions.MOVIES:
      return (bookmarks?.movies?.findIndex((bookmarkItem) => bookmarkItem.slug === targetItem.slug) ?? -1) < 0 ? false : true
    case categoryOptions.TVSHOWS:
      return (bookmarks?.tvshows?.findIndex((bookmarkItem) => bookmarkItem.slug === targetItem.slug) ?? -1) < 0 ? false : true
  }
}
