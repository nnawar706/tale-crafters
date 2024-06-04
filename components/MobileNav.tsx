"use client"

import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const MobileNav = () => {
  const pathname = usePathname()
  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image src="/icons/hamburger.svg" width="30" height="30" alt="menu" 
          className="cursor-pointer"/>
        </SheetTrigger>
        <SheetContent side="right" className="border-none bg-black-1">
          <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 pl-14">
            <Image src="/icons/logo.svg" width="23" height="27" alt="logo" />
            <h1 className="text-24 font-extrabold text-white-1">TaleCraft</h1>
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 text-white-1">
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                  return (
                    <SheetClose asChild key={item.label}>
                      <Link href={item.route} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start", {
                        'bg-nav-focus border-b-2 border-orange-1': isActive
                      })}>
                        <Image src={item.imgUrl} alt={item.label} width={24} height={24} />
                        <p>{item.label}</p>
                      </Link>
                    </SheetClose>
                  )
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav