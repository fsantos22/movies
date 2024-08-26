'use client'
import Loading from '@/components/Loading'
import { GET_DATA } from '@/graphql/queries'
import { useBookmarks } from '@/hooks/useBookmarks'
import { useFetch } from '@/hooks/useFetch'
import { BOOKMARKS_INITIAL_STATE_STRINGFIED, categoryOptions } from '@/utils/constraints'
import renderCards from '@/utils/renderCards'
import { useEffect } from 'react'

export default function Home() {
  const { bookmarks, updateBookmarks } = useBookmarks()
  const { movies, tvshows, isLoading, fetchData } = useFetch()

  useEffect(() => {
    fetchData(GET_DATA(6))
    const { state } = JSON.parse(localStorage.getItem('bookmarks') ?? BOOKMARKS_INITIAL_STATE_STRINGFIED)
    if (state?.bookmarks) {
      updateBookmarks(state.bookmarks)
    }
  }, [fetchData, updateBookmarks])

  return (
    <section className="flex flex-col gap-12 p-8">
      <div>
        <h2 className="py-2 text-lg">Filmes</h2>
        <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
          {isLoading ? <Loading /> : renderCards(movies, bookmarks, categoryOptions.MOVIES)}
        </div>
      </div>
      <div>
        <h2 className="py-2 text-lg">Series</h2>
        <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
          {isLoading ? <Loading /> : renderCards(tvshows, bookmarks, categoryOptions.TVSHOWS)}
        </div>
      </div>
    </section>
  )
}
