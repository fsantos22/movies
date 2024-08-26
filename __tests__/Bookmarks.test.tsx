/* eslint-disable testing-library/prefer-screen-queries */
import Bookmarks from '@/app/bookmarks/page'
import { GET_DATA } from '@/graphql/queries'
import { useFetch } from '@/hooks/useFetch'
import { Bookmarks as BookmarksType } from '@/types/types'
import { BOOKMARKS_INITIAL_STATE } from '@/utils/constraints'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { movieObj, tvshowObj } from '../src/utils/mocks'

jest.mock('@/hooks/useFetch')

describe('Bookmarks Component', () => {
  const mockFetchData = jest.fn()

  beforeEach(() => {
    ;(useFetch as unknown as jest.Mock).mockReturnValue({
      isLoading: true,
      fetchData: mockFetchData,
    })

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(JSON.stringify({ state: { bookmarks: BOOKMARKS_INITIAL_STATE } })),
        setItem: jest.fn(),
      },
      writable: true,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fetches data on mount', () => {
    render(<Bookmarks />)
    expect(mockFetchData).toHaveBeenCalledWith(GET_DATA())
  })

  it('reads bookmarks from localStorage on mount', () => {
    render(<Bookmarks />)
    expect(localStorage.getItem).toHaveBeenCalledWith('bookmarks')
  })

  it('renders movie and tv show cards after data is loaded', () => {
    const bookmarks: BookmarksType = {
      movies: [movieObj],
      tvshows: [tvshowObj],
    }

    ;(useFetch as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      fetchData: mockFetchData,
    })

    localStorage.getItem = jest.fn().mockReturnValueOnce(JSON.stringify({ state: { bookmarks } }))

    const view = render(<Bookmarks />)
    expect(view.getByText(movieObj.advanced_custom_fields.title)).toBeInTheDocument()
    expect(view.getByText(tvshowObj.advanced_custom_fields.title)).toBeInTheDocument()
  })

  it('shows empty state message when there are no bookmarks', () => {
    const bookmarks: BookmarksType = { movies: [], tvshows: [] }

    ;(useFetch as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      fetchData: mockFetchData,
    })

    localStorage.getItem = jest.fn().mockReturnValueOnce(JSON.stringify({ state: { bookmarks } }))

    const view = render(<Bookmarks />)
    expect(view.getByText('Nenhum item encontrado')).toBeInTheDocument()
  })
})
