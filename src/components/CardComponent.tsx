import { Badge } from '@/components/ui/badge'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { useBookmarks } from '@/hooks/useBookmarks'
import { CardComponentProps } from '@/types/types'
import { categoryOptions } from '@/utils/constraints'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const CardComponent: React.FC<CardComponentProps> = ({ item, bookmarked, category }) => {
  const { bookmarks, updateBookmarks } = useBookmarks()
  const [inBookmarks, setInBookmarks] = useState<boolean>(bookmarked)
  const { title, gender, releaseDate, img } = item.advanced_custom_fields

  const handleClickBookmark = () => {
    setInBookmarks(!inBookmarks)

    switch (category) {
      case categoryOptions.MOVIES:
        if (!inBookmarks) {
          const bookmarkObject = { ...bookmarks, movies: [...bookmarks?.movies, item] }
          updateBookmarks(bookmarkObject)
        } else {
          const arrayWithoutItem = bookmarks?.movies.filter((bookmarkItem) => {
            return bookmarkItem.slug !== item.slug
          })
          const bookmarkObject = { ...bookmarks, movies: arrayWithoutItem }
          updateBookmarks(bookmarkObject)
        }
        break
      case categoryOptions.TVSHOWS:
        if (!inBookmarks) {
          const bookmarkObject = { ...bookmarks, tvshows: [...bookmarks?.tvshows, item] }
          updateBookmarks(bookmarkObject)
        } else {
          const arrayWithoutItem = bookmarks?.tvshows.filter((bookmarkItem) => {
            return bookmarkItem.slug !== item.slug
          })
          const bookmarkObject = { ...bookmarks, tvshows: arrayWithoutItem }
          updateBookmarks(bookmarkObject)
        }
        break
      default:
        break
    }
  }

  return (
    <Card
      aria-label={`Media card of ${title}`}
      className="flex h-[184px] w-[302px] max-w-[302px] flex-col justify-between rounded border-0 p-1"
      style={{
        backgroundImage: `url(${img?.sourceUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <CardHeader className="p-1">
        <div className="flex justify-between">
          <Badge variant="outline" className="flex h-6 cursor-default items-center justify-center border-0 bg-orange-500">
            {gender[1]}
          </Badge>
          <FaStar
            aria-label={`Bookmark button of ${title}`}
            className={`h-6 w-6 ${inBookmarks ? 'text-orange-500' : 'text-zinc-500 hover:text-orange-500'} cursor-pointer`}
            onClick={handleClickBookmark}
          />
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col items-start p-1 text-base">
        <span>{title}</span>
        <span className="text-sm text-gray-400">{releaseDate}</span>
      </CardFooter>
    </Card>
  )
}

export default CardComponent
