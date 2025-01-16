import React, { useState } from 'react'
import HomeCarousel from '../components/HomeCarousel'
import MovieCard from '../components/MovieCard'
import MovieDialogueProvider from '@/utils/MovieDialogueProvider'
import { MovieContext } from '@/utils/MovieContextProvider'
import { useContext } from 'react'
import { useEffect } from 'react'
export default function MovieFeed() {

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
        <div className="mt-6 flex flex-wrap justify-center gap-3">
            <MovieDialogueProvider>
                {
                    moviesList.map((movie, index) => <MovieCard movie={movie} key={`MovieFeedCard-${index}`} />)
                }
            </MovieDialogueProvider>
        </div>
    )
}
