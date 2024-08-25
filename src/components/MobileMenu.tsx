'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { FaAlignRight, FaStar } from 'react-icons/fa'
import { menuItems } from './Sidemenu'
import { Button } from './ui/button'

const MobileMenu: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <FaAlignRight />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded border-0 bg-zinc-900/95">
        {menuItems.map((item, key) => {
          return (
            <DropdownMenuItem asChild key={key} className="group/item flex gap-1 text-zinc-500">
              <Link href={item.link} className="group-hover/item:text-white">
                <div className="flex cursor-pointer items-center gap-2">
                  {item.icon}
                  {item.label}
                </div>
              </Link>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="group/item flex gap-1 text-zinc-500">
          <Link href="/bookmarks" className="group-hover/item:text-white">
            <div className="flex cursor-pointer items-center gap-2 group-hover/item:text-white">
              <FaStar />
              Favoritos
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobileMenu
