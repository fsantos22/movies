'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useState } from 'react'
import { FaAlignRight, FaTimes } from 'react-icons/fa'
import { menuItems } from './Sidemenu'
import { Button } from './ui/button'

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Mobile menu button" variant="ghost">
          {isOpen ? <FaTimes className="h-5 w-5" /> : <FaAlignRight className="h-5 w-5" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded border border-zinc-700 bg-zinc-900/95">
        {menuItems.map((item, key) => {
          return (
            <DropdownMenuItem asChild key={key} className="group/item flex gap-1 text-zinc-500">
              <Link href={item.link} className="group-hover/item:text-white">
                <div className="flex cursor-pointer items-center gap-2">{item.label}</div>
              </Link>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuItem asChild className="group/item flex gap-1 text-zinc-500">
          <Link href="/bookmarks" className="group-hover/item:text-white">
            <div className="flex cursor-pointer items-center gap-2 group-hover/item:text-white">Favoritos</div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobileMenu
