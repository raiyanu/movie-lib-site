import { useContext, useState, useEffect } from "react";
import { MovieContext } from '@/utils/MovieContextProvider'
import MovieFeed from '@/section/MovieFeed'
export default function Favorite() {
    const { getFavoriteList } = useContext(MovieContext);
    const [moviesList, setMoviesList] = useState([]);
    useEffect(() => {
        const run = async () => {
            const result = await getFavoriteList();
            setMoviesList(() => result)
            console.log(moviesList);
        }
        run();
    }, []);

    return (
        <div className='max-w-full overflow-x-clip pb-52'>
            <MovieFeed moviesList={moviesList} />
        </div>
    )
}
