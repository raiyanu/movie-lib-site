import { useContext, useState, useEffect, Suspense, lazy } from "react";
import { MovieContext } from '@/utils/MovieContextProvider'
const MovieFeed = lazy(() => import('@/section/MovieFeed'));
import { HalfSceenLoader } from "./Home";
export default function Favorite() {
    const { favoriteMovie } = useContext(MovieContext);
    return (
        <div className='max-w-full overflow-x-clip pb-52'>
            <Suspense fallback={<HalfSceenLoader />}>
                <MovieFeed moviesList={favoriteMovie} />
            </Suspense>
        </div>
    )
}
