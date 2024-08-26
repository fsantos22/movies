/* eslint-disable react/display-name */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
import Home from '@/app/page'
import { useBookmarks } from '@/hooks/useBookmarks'
import { useFetch } from '@/hooks/useFetch'
import { checkBookmark } from '@/utils/checkBookmark'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { movieObj, tvshowObj } from '../src/utils/mocks'

// Mock hooks and utilities
jest.mock('@/hooks/useBookmarks')
jest.mock('@/hooks/useFetch')
jest.mock('@/utils/checkBookmark')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.mock('@/components/CardComponent', () => (props: any) => <div data-testid="card-component" {...props} />)
jest.mock('@/components/Loading', () => () => <div>Loading...</div>)

describe('Home Page', () => {
  const mockBookmarks = { bookmarks: [] }
  const mockUpdateBookmarks = jest.fn()
  const mockFetchData = jest.fn()
  const mockCheckBookmark = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(useBookmarks as unknown as jest.Mock).mockReturnValue({
      bookmarks: mockBookmarks.bookmarks,
      updateBookmarks: mockUpdateBookmarks,
    })

    ;(useFetch as unknown as jest.Mock).mockReturnValue({
      movies: [],
      tvshows: [],
      isLoading: false,
      fetchData: mockFetchData,
    })

    ;(checkBookmark as jest.Mock).mockImplementation(mockCheckBookmark)
  })

  it('renders loading state correctly', () => {
    ;(useFetch as unknown as jest.Mock).mockReturnValueOnce({
      movies: [],
      tvshows: [],
      isLoading: true,
      fetchData: mockFetchData,
    })

    const view = render(<Home />)
    expect(view.queryAllByText('Loading...').length).toEqual(2)
    expect(view.queryAllByText('Loading...')[0]).toBeInTheDocument()
    expect(view.queryAllByText('Loading...')[1]).toBeInTheDocument()
  })

  it('renders movies and tvshows correctly', async () => {
    ;(useFetch as unknown as jest.Mock).mockReturnValueOnce({
      movies: [movieObj],
      tvshows: [tvshowObj],
      isLoading: false,
      fetchData: mockFetchData,
    })
    const view = render(<Home />)

    await waitFor(() => expect(view.queryByText('Loading...')).not.toBeInTheDocument())

    const mediaCards = screen.getAllByTestId('card-component')
    expect(mediaCards).toHaveLength(2)

    expect(mockCheckBookmark).toHaveBeenCalledWith(mockBookmarks.bookmarks, movieObj, expect.anything())
    expect(mockCheckBookmark).toHaveBeenCalledWith(mockBookmarks.bookmarks, tvshowObj, expect.anything())
  })

  it('fetches data on mount', () => {
    render(<Home />)
    expect(mockFetchData).toHaveBeenCalledWith(expect.any(String))
  })

  xit('updates bookmarks from localStorage on mount', () => {
    const mockLocalStorageData = JSON.stringify({ movies: [movieObj], tvshows: [tvshowObj] })
    Storage.prototype.getItem = jest.fn(() => mockLocalStorageData)

    render(<Home />)
    expect(mockUpdateBookmarks).toHaveBeenCalledWith({ movies: [movieObj], tvshows: [tvshowObj] })
  })
})
