'use client'
import CardComponent from '@/components/CardComponent'
import Loading from '@/components/Loading'
import { GET_TVSHOWS } from '@/graphql/queries'
import { useBookmarks } from '@/hooks/useBookmarks'
import { useFetch } from '@/hooks/useFetch'
import { checkBookmark } from '@/utils/checkBookmark'
import { BOOKMARKS_INITIAL_STATE_STRINGFIED, categoryOptions } from '@/utils/constraints'
import { useEffect } from 'react'

export default function Tvshows() {
  const { bookmarks, updateBookmarks } = useBookmarks()
  const { tvshows, isLoading, fetchData } = useFetch()

  useEffect(() => {
    fetchData(GET_TVSHOWS())
    const { state } = JSON.parse(localStorage.getItem('bookmarks') ?? BOOKMARKS_INITIAL_STATE_STRINGFIED)
    if (state?.bookmarks) {
      updateBookmarks(state.bookmarks)
    }
  }, [fetchData, updateBookmarks])

  return (
    <div className="container flex flex-col gap-12 p-8">
      <div>
        <h2 className="py-2 text-lg">Series</h2>
        <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
          {isLoading ? (
            <Loading />
          ) : tvshows?.length > 0 ? (
            tvshows?.map((tvshow, key: number) => {
              const isBookmarked = checkBookmark(bookmarks, tvshow, categoryOptions.TVSHOWS)
              return <CardComponent key={key} item={tvshow} bookmarked={isBookmarked} category={categoryOptions.TVSHOWS} />
            })
          ) : (
            <p className="text-zinc-500">Nenhuma serie encontrada</p>
          )}
        </div>
      </div>
    </div>
  )
}
