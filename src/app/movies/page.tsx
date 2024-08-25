'use client'
import CardComponent from '@/components/CardComponent'
import Loading from '@/components/Loading'
import { GET_MOVIES } from '@/graphql/queries'
import { useBookmarks } from '@/hooks/useBookmarks'
import { useFetch } from '@/hooks/useFetch'
import { BOOKMARKS_INITIAL_STATE_STRINGFIED, categoryOptions } from '@/utils/constraints'
import { useEffect } from 'react'
import { checkBookmark } from '@/utils/checkBookmark'

export default function Movies() {
  const { bookmarks, updateBookmarks } = useBookmarks()
  const { movies, isLoading, fetchData } = useFetch()
  useEffect(() => {
    fetchData(GET_MOVIES())
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
          ) : movies?.length > 0 ? (
            movies?.map((movie, key: number) => {
              const isBookmarked = checkBookmark(bookmarks, movie, categoryOptions.MOVIES)
              return <CardComponent key={key} bookmarked={isBookmarked} item={movie} category={categoryOptions.MOVIES} />
            })
          ) : (
            <p className="text-zinc-500">Nenhum filme encontrado</p>
          )}
        </div>
      </div>
    </div>
  )
}
