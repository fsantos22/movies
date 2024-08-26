/* eslint-disable testing-library/prefer-screen-queries */
// __tests__/Tvshows.test.tsx
import Tvshows from '@/app/tvshows/page'
import { GET_TVSHOWS } from '@/graphql/queries'
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
  GET_TVSHOWS: jest.fn(),
}))

describe('Tvshows Page', () => {
  const mockFetchData = jest.fn()
  const mockUpdateBookmarks = jest.fn()
  const mockRenderCards = renderCards as jest.MockedFunction<typeof renderCards>

  beforeEach(() => {
    ;(useFetch as unknown as jest.Mock).mockReturnValue({
      tvshows: [],
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

  it('fetches tv shows data on mount', () => {
    render(<Tvshows />)
    expect(mockFetchData).toHaveBeenCalledWith(GET_TVSHOWS())
  })

  it('reads bookmarks from localStorage on mount', () => {
    render(<Tvshows />)
    expect(localStorage.getItem).toHaveBeenCalledWith('bookmarks')
  })

  it('updates bookmarks state when data is found in localStorage', () => {
    localStorage.getItem = jest.fn().mockReturnValueOnce(
      JSON.stringify({
        state: { bookmarks: ['mockBookmark'] },
      }),
    )

    render(<Tvshows />)
    expect(mockUpdateBookmarks).toHaveBeenCalledWith(['mockBookmark'])
  })

  it('renders cards after data is loaded', () => {
    ;(useFetch as unknown as jest.Mock).mockReturnValue({
      tvshows: ['mockTvShow'],
      isLoading: false,
      fetchData: mockFetchData,
    })
    const view = render(<Tvshows />)
    expect(mockRenderCards).toHaveBeenCalledWith(['mockTvShow'], [], expect.any(String))
    expect(view.getByText('Mocked Cards')).toBeInTheDocument()
  })
})
