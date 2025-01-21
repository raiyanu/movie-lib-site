import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../utils/MovieContextProvider";
import { MovieSheetContext } from "@/utils/MovieSheetProvider";
import MovieSheetProvider from "../utils/MovieSheetProvider";
export default function HomeCarousel() {
    const { getTrendingMovieCarousel } = useContext(MovieContext);
    const [movieList, setfirst] = useState([]);

    useEffect(() => {
        async function run() {
            setfirst(await getTrendingMovieCarousel());
        }
        run();
    }, []);

    return (
        <MovieSheetProvider>

            <Carousel
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
                opts={{
                    align: "start",
                    loop: "true",
                }}
                className="h-fit max-w-full"
            >
                <CarouselContent>
                    {movieList.map((movie, index) => (
                        <CarouselItemContent
                            key={"carouselItem" + index}
                            movie={movie}
                            index={index}
                        />
                    ))}
                </CarouselContent>
                <div className="relative mt-2 flex w-full items-center justify-end gap-4 *:block">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        </MovieSheetProvider>
    );
}

function CarouselItemContent({ movie }) {
    const { ExpandMovie } = useContext(MovieSheetContext);
    const { getMovieSummary, failedFetchPlaceHolder } = useContext(MovieContext);
    const [movieFullData, setMovieFullData] = useState(failedFetchPlaceHolder);

    useEffect(() => {
        async function run() {
            let data = await getMovieSummary(movie.imdbID);
            setMovieFullData(() => data);
        }
        run();
    }, [movie.imdbID]);


    const expandDetail = async () => {
        const movieData = await getMovieSummary(movie.imdbID);
        ExpandMovie(movie.imdbID, movieData);
    }

    return (
        <CarouselItem className="flex items-center justify-center" onClick={expandDetail}>
            <a
                // href={`/movie/${movie.imdbID}`}
                style={{ backgroundImage: `url(${movie.Poster})` }}
                className="h-36 w-full max-w-[98%] cursor-pointer overflow-hidden rounded-md bg-cover bg-center bg-no-repeat p-4 lg:h-60"
            >
                <h2 className="w-fit max-w-full text-3xl font-semibold text-zinc-50 xl:text-3xl">
                    {movieFullData.Title}
                </h2>
                <span className="text-sm font-semibold">{`${movieFullData?.Ratings[0]?.Value}`}</span>
            </a>
        </CarouselItem>
    );
}


