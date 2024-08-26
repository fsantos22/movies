/* eslint-disable testing-library/prefer-screen-queries */
// __tests__/Movies.test.tsx
import Movies from '@/app/movies/page'
import { GET_MOVIES } from '@/graphql/queries'
import { useBookmarks } from '@/hooks/useBookmarks'
import { useFetch } from '@/hooks/useFetch'
import { BOOKMARKS_INITIAL_STATE_STRINGFIED } from '@/utils/constraints'
import renderCards from '@/utils/renderCards'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Mocking useFetch, useBookmarks, and renderCards
jest.mock('@/hooks/useFetch')
jest.mock('@/hooks/useBookmarks')
jest.mock('@/utils/renderCards', () => jest.fn())
jest.mock('@/graphql/queries', () => ({
  GET_MOVIES: jest.fn(),
}))

describe('Movies Component', () => {
  const mockFetchData = jest.fn()
  const mockUpdateBookmarks = jest.fn()
  const mockRenderCards = renderCards as jest.MockedFunction<typeof renderCards>

  beforeEach(() => {
    ;(useFetch as unknown as jest.Mock).mockReturnValue({
      movies: [],
      isLoading: true,
      fetchData: mockFetchData,
    })
    ;(useBookmarks as unknown as jest.Mock).mockReturnValue({
      bookmarks: [],
      updateBookmarks: mockUpdateBookmarks,
    })

    mockRenderCards.mockReturnValue(<div>Mocked Cards</div>)

    // Mocking localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(BOOKMARKS_INITIAL_STATE_STRINGFIED),
        setItem: jest.fn(),
      },
      writable: true,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fetches movies data on mount', () => {
    render(<Movies />)
    expect(mockFetchData).toHaveBeenCalledWith(GET_MOVIES())
  })

  it('reads bookmarks from localStorage on mount', () => {
    render(<Movies />)
    expect(localStorage.getItem).toHaveBeenCalledWith('bookmarks')
  })

  it('updates bookmarks state when data is found in localStorage', () => {
    localStorage.getItem = jest.fn().mockReturnValueOnce(
      JSON.stringify({
        state: { bookmarks: ['mockBookmark'] },
      }),
    )

    render(<Movies />)
    expect(mockUpdateBookmarks).toHaveBeenCalledWith(['mockBookmark'])
  })

  it('renders cards after data is loaded', () => {
    ;(useFetch as unknown as jest.Mock).mockReturnValue({
      movies: ['mockMovie'],
      isLoading: false,
      fetchData: mockFetchData,
    })

    const view = render(<Movies />)
    expect(mockRenderCards).toHaveBeenCalledWith(['mockMovie'], [], expect.any(String))
    expect(view.getByText('Mocked Cards')).toBeInTheDocument()
  })
})
