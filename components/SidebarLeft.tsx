"use client"

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

const SidebarLeft = () => {
    const pathname = usePathname()
    const router = useRouter()
    
    return (
        <section className="sticky left-0 top-0 w-fit flex flex-col justify-between 
        border-none bg-black-1 pt-8 text-white-1 
        max-md:hidden lg:w-[270px] lg:px-8">
            <nav className="flex flex-col gap-5">
                <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10
                max-lg:justify-center">
                    <Image src="/icons/logo.svg" alt='logo' width={23} height={27}/>
                    <h1 className="text-24 font-extrabold text-white max-lg:hidden">TaleCraft</h1>
                </Link>

                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                    return (
                        <Link href={item.route} key={item.label}
                        className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start", {
                            "bg-nav-focus border-b-2 border-orange-1": isActive
                        })}>
                            <Image src={item.imgUrl} alt={item.label} width={24} height={24}/>
                            <p>{item.label}</p>
                        </Link>
                    )
                })}
            </nav>
        </section>
    )
}

export default SidebarLeft