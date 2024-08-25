import MobileMenu from '@/components/MobileMenu'
import Link from 'next/link'
import { FaFilm, FaStar } from 'react-icons/fa'

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 flex w-[99vw] justify-between bg-[#0D0D0D]/60 p-4">
      <div className="flex gap-4 text-lg">
        <FaFilm className="h-7 w-7 p-1" />
        <h1>MOVIES</h1>
      </div>
      <div className="hidden items-center text-base sm:flex">
        <Link href="/bookmarks" className="flex gap-2">
          <FaStar className="h-6 w-6 text-orange-500" />
          Favoritos
        </Link>
      </div>
      <div className="flex sm:hidden">
        <MobileMenu />
      </div>
    </header>
  )
}

export default Header
