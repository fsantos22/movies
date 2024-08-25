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

  useEffect(() => {
    fetchData(GET_DATA())
    const { state } = JSON.parse(localStorage.getItem('bookmarks') ?? '{}')
    setBookmarks(state?.bookmarks)
  }, [fetchData])

  return (
    <div className="container flex flex-col gap-12 p-8">
      <h1>FAVORITOS</h1>
      <div>
        <h2 className="py-2 text-lg">Filmes</h2>
        <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
          {isLoading ? (
            <Loading />
          ) : bookmarks?.movies.length > 0 ? (
            bookmarks?.movies?.map((movie, key: number) => {
              const isBookmarked = checkBookmark(bookmarks, movie, categoryOptions.MOVIES)
              return <CardComponent key={key} item={movie} bookmarked={isBookmarked} category={categoryOptions.MOVIES} />
            })
          ) : (
            <p className="text-zinc-500">Nenhum filme encontrado</p>
          )}
        </div>
      </div>
      <div>
        <h2 className="py-2 text-lg">Series</h2>
        <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
          {isLoading ? (
            <Loading />
          ) : bookmarks?.tvshows.length > 0 ? (
            bookmarks?.tvshows?.map((tvshow, key: number) => {
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
