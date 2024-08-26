'use client'
import CardComponent from '@/components/CardComponent'
import Loading from '@/components/Loading'
import { GET_DATA } from '@/graphql/queries'
import { useFetch } from '@/hooks/useFetch'
import type { Bookmarks } from '@/types/types'
import { checkBookmark } from '@/utils/checkBookmark'
import { BOOKMARKS_INITIAL_STATE, categoryOptions } from '@/utils/constraints'
import { useEffect, useState } from 'react'

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmarks>(BOOKMARKS_INITIAL_STATE)
  const { isLoading, fetchData } = useFetch()

  const renderMovies = bookmarks?.movies?.map((movie, key: number) => {
    const isBookmarked = checkBookmark(bookmarks, movie, categoryOptions.MOVIES)
    return <CardComponent key={key} item={movie} bookmarked={isBookmarked} category={categoryOptions.MOVIES} />
  })

  const renderTvshows = bookmarks?.tvshows?.map((tvshow, key: number) => {
    const isBookmarked = checkBookmark(bookmarks, tvshow, categoryOptions.TVSHOWS)
    return <CardComponent key={key} item={tvshow} bookmarked={isBookmarked} category={categoryOptions.TVSHOWS} />
  })
  const isEmpty = renderMovies.length === 0 && renderTvshows.length === 0

  useEffect(() => {
    fetchData(GET_DATA())
    const { state } = JSON.parse(localStorage.getItem('bookmarks') ?? '{}')
    setBookmarks(state?.bookmarks)
  }, [fetchData])

  return (
    <section className="container flex flex-col gap-8 p-8">
      <h2 className="py-3 text-lg">Meus favoritos</h2>
      <div>
        {/* <h2 className="py-3 text-lg">Filmes</h2> */}
        <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
          {isLoading ? (
            <Loading />
          ) : !isEmpty ? (
            <>
              {renderMovies}
              {renderTvshows}
            </>
          ) : (
            <p className="text-zinc-500">Nenhum item encontrado</p>
          )}
        </div>
      </div>
    </section>
  )
}
