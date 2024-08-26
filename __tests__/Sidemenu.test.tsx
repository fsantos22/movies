/* eslint-disable testing-library/prefer-screen-queries */
import Sidemenu, { menuItems } from '@/components/Sidemenu'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

describe('Sidemenu Component', () => {
  it('renders the menu header', () => {
    const view = render(<Sidemenu />)

    expect(view.getByText('Menu')).toBeInTheDocument()
    expect(view.getByText('Menu')).toBeVisible()
  })

  it('renders all menu items', () => {
    const view = render(<Sidemenu />)

    menuItems.forEach((item) => {
      expect(view.getByText(item.label)).toBeInTheDocument()
      expect(view.getByText(item.label)).toBeVisible()
    })
  })

  it('renders each menu link with correct href', () => {
    const view = render(<Sidemenu />)

    menuItems.forEach((item) => {
      const linkElement = view.getByRole('link', { name: item.label })
      expect(linkElement).toHaveAttribute('href', item.link)
    })
  })
})
