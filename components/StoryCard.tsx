"use client"

import React from 'react'

import { StoryCardProps } from '@/types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const StoryCard = ({ id, imgUrl, title, detail }: StoryCardProps) => {
  // const router = useRouter()

  // TODO: increment view on click
  const incrementStoryView = () => {}

  return (
    <div className="cursor-pointer" onClick={incrementStoryView}>
      <figure className="flex flex-col gap-2">
        <Image src={imgUrl} width="174" height="174" alt={title} 
        className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"/>
        <div className="flex flex-col">
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
          <h2 className="text-12 truncate font-normal capitalize text-white-4">{detail}</h2>
        </div>
      </figure>
    </div>
  )
}

export default StoryCard