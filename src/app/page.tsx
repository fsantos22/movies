'use client'
import CardComponent from '@/components/CardComponent'
import Loading from '@/components/Loading'
import { GET_DATA } from '@/graphql/queries'
import { useBookmarks } from '@/hooks/useBookmarks'
import { useFetch } from '@/hooks/useFetch'
import { checkBookmark } from '@/utils/checkBookmark'
import { BOOKMARKS_INITIAL_STATE_STRINGFIED, categoryOptions } from '@/utils/constraints'
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
    <div className="container flex flex-col gap-12 p-8">
      <div>
        <h2 className="py-2 text-lg">Filmes</h2>
        <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
          {isLoading ? (
            <Loading />
          ) : (
            movies?.map((movie, key: number) => {
              const isBookmarked = checkBookmark(bookmarks, movie, categoryOptions.MOVIES)
              return <CardComponent key={key} item={movie} bookmarked={isBookmarked} category={categoryOptions.MOVIES} />
            })
          )}
        </div>
      </div>
      <div>
        <h2 className="py-2 text-lg">Series</h2>
        <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
          {isLoading ? (
            <Loading />
          ) : (
            tvshows?.map((tvshow, key: number) => {
              const isBookmarked = checkBookmark(bookmarks, tvshow, categoryOptions.TVSHOWS)
              return <CardComponent key={key} item={tvshow} bookmarked={isBookmarked} category={categoryOptions.TVSHOWS} />
            })
          )}
        </div>
      </div>
    </div>
  )
}
