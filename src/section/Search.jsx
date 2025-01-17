import React, { useContext, lazy, Suspense, useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router'
const MovieCardContainer = lazy(() => import("@/section/MovieCardContainer"));
import { MovieContext } from '@/utils/MovieContextProvider';
import { HalfSceenLoader } from './Home';
export default function Search() {
    const params = useParams();
    const { searchMedia, feedLoading } = useContext(MovieContext);
    const [moviesList, setmMoviesList] = useState([]);

    useEffect(() => {
        const run = async () => {
            const data = await searchMedia(params.searchType, params.searchInput)
            console.log(data);
            setmMoviesList(data);
        }
        run();
    }, [params.searchType, params.searchInput])
    return (
        <div>
            <Suspense fallback={<HalfSceenLoader />}>
                {
                    feedLoading ? <HalfSceenLoader /> :
                        <MovieCardContainer moviesList={moviesList} />
                }
            </Suspense>
        </div>
    )
}
