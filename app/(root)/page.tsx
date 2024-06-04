import StoryCard from '@/components/StoryCard'
import { data } from '@/constants'
import React from 'react'

const Home = () => {
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">
          Trending Stories
        </h1>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {data.map((item) => (
            <StoryCard
              key={item.id}
              id={item.id}
              imgUrl={item.imgURL as string}
              title={item.title}
              detail={item.description}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home