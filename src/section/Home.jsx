import React from 'react'
import MovieFeed from "@/section/MovieFeed";
import { useState } from 'react'
import HomeCarousel from '../components/HomeCarousel'
import MovieCard from '../components/MovieCard'
import MovieDialogueProvider from '@/utils/MovieDialogueProvider'
import { MovieContext } from '@/utils/MovieContextProvider'
import { useContext } from 'react'
import { useEffect } from 'react'
export default function Home() {
    const { getTrendingMovie } = useContext(MovieContext);
    const [moviesList, setMoviesList] = useState([]);
    useEffect(() => {
        const run = async () => {
            const result = await getTrendingMovie();
            setMoviesList(() => result)
        }
        console.log(moviesList);
        run();
    }, []);

    return (
        <div className='max-w-full overflow-x-clip pb-52'>
            <HomeCarousel />
            <MovieFeed moviesList={moviesList} />
        </div>
    )
}
