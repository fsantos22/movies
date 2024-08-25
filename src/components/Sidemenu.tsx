import Link from 'next/link'

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { MenuItem } from '@/types/types'
import { FaHome, FaTv, FaVideo } from 'react-icons/fa'

export const menuItems: MenuItem[] = [
  {
    label: 'Home',
    icon: <FaHome />,
    link: '/',
  },
  {
    label: 'Filmes',
    icon: <FaVideo />,
    link: '/movies',
  },
  {
    label: 'Series',
    icon: <FaTv />,
    link: '/tvshows',
  },
]

const Sidemenu: React.FC = () => {
  return (
    <aside className="hidden min-w-[215px] flex-col gap-5 p-8 sm:flex">
      <h4>Menu</h4>
      <NavigationMenu className="flex grow items-start">
        <NavigationMenuList className="flex flex-col gap-5">
          {menuItems.map((item, key) => {
            return (
              <NavigationMenuItem key={key} className="group/item flex gap-1 text-zinc-500">
                <Link href={item.link} legacyBehavior passHref>
                  <NavigationMenuLink className="group-hover/item:text-orange-500">
                    <div className="flex cursor-pointer items-center gap-2 group-hover/item:text-orange-500">
                      {item.icon}
                      {item.label}
                    </div>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  )
}

export default Sidemenu
