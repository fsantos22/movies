import CardComponent from '@/components/CardComponent'
import { Bookmarks, Data } from '@/types/types'
import { checkBookmark } from './checkBookmark'
import { categoryOptions } from './constraints'

const renderCards = (itemsList: Data[], bookmarks: Bookmarks, category: categoryOptions) => {
  const component =
    itemsList?.length > 0 ? (
      itemsList?.map((item, key: number) => {
        const isBookmarked = checkBookmark(bookmarks, item, category)
        return <CardComponent key={key} item={item} bookmarked={isBookmarked} category={category} />
      })
    ) : (
      <p className="text-zinc-500">Nenhuma serie encontrada</p>
    )
  return component
}

export default renderCards
