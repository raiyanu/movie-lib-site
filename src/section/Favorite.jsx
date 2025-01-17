import { useContext, useState, useEffect } from "react";
import { MovieContext } from '@/utils/MovieContextProvider'
import MovieFeed from '@/section/MovieFeed'
export default function Favorite() {
    const { favoriteMovie } = useContext(MovieContext);
    return (
        <div className='max-w-full overflow-x-clip pb-52'>
            <MovieFeed moviesList={favoriteMovie} />
        </div>
    )
}
