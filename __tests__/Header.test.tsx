/* eslint-disable testing-library/prefer-screen-queries */
import Header from '@/components/Header'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

// eslint-disable-next-line react/display-name
jest.mock('@/components/MobileMenu', () => () => <div data-testid="mobile-menu">Mobile Menu</div>)

describe('Header Component', () => {
  it('renders the header with item titles', () => {
    const view = render(<Header />)

    expect(view.getByText('MOVIES')).toBeInTheDocument()
    expect(view.getByRole('link', { name: /Bookmark button link/i })).toBeInTheDocument()
    expect(view.getByRole('link', { name: /Bookmark button link/i })).toHaveAttribute('href', '/bookmarks')
    expect(view.getByTestId('mobile-menu')).toBeInTheDocument()
  })

  it('renders the desktop menu', async () => {
    const view = render(<Header />)
    const bookmarkLink = view.getByRole('link', { name: /Bookmark button link/i })
    expect(bookmarkLink).toBeVisible()
    expect(bookmarkLink).toHaveTextContent('Favoritos')
  })

  xit('renders the mobile menu on smaller screens', () => {
    const view = render(<Header />)

    expect(view.getByTestId('mobile-menu')).toBeInTheDocument()
  })

  xit('hides the mobile menu on larger screens', () => {
    const view = render(<Header />)

    const mobileMenu = view.getByTestId('mobile-menu')
    expect(mobileMenu).not.toBeInTheDocument()
  })
})
