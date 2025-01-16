import React from 'react'
import HomeCarousel from '../components/HomeCarousel'
import MovieCard from '../components/MovieCard'
import MovieFeed from "@/section/MovieFeed";

export default function Home() {
    return (
        <div className='max-w-full overflow-x-clip pb-52'>
            <HomeCarousel />
            <MovieFeed />
        </div>
    )
}
