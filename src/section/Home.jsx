import React, { useState, useEffect, useContext } from 'react';
import MovieFeed from "@/section/MovieFeed";
import HomeCarousel from '../components/HomeCarousel';
import { MovieContext } from '@/utils/MovieContextProvider';

export default function Home() {
    const { getTrendingMovie } = useContext(MovieContext);
    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await getTrendingMovie(1);
                if (Array.isArray(result)) {
                    setMoviesList([...result]);
                } else {
                    console.error("Expected an array, but got:", result);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className='max-w-full overflow-x-clip pb-52'>
            <HomeCarousel />
            <MovieFeed moviesList={moviesList} />
        </div>
    );
}
