import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../utils/MovieContextProvider";
import { useFormState } from "react-dom";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

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
    );
}

function CarouselItemContent({ movie }) {
    const { getMovieSummary, failedFetchPlaceHolder } = useContext(MovieContext);

    const [movieFullData, setMovieFullData] = useState(failedFetchPlaceHolder);

    // const fetchFullMovieData = async (id) => {
    //     const result = await axios.get(
    //         `https://www.omdbapi.com/?apikey=9e86699a&i=${id}`
    //     );
    //     return result.data;
    // };
    useEffect(() => {
        // setMovieFullData(async () => await fetchFullMovieData());
        async function run() {
            let data = await getMovieSummary(movie.imdbID);
            setMovieFullData(() => data);
        }
        run();
    }, [movie.imdbID]);
    return (
        <CarouselItem className="flex items-center justify-center">
            <a
                href={`/movie/${movie.imdbID}`}
                style={{ backgroundImage: `url(${movie.Poster})` }}
                className="h-36 w-full max-w-[98%] overflow-hidden rounded-md bg-cover bg-center bg-no-repeat p-4 lg:h-60"
            >
                <h2 className="w-fit max-w-full text-3xl font-semibold text-zinc-50 xl:text-3xl">
                    {movieFullData.Title}
                </h2>
                <span className="text-sm font-semibold">{`${movieFullData?.Ratings[0]?.Value}`}</span>
            </a>
        </CarouselItem>
    );
}


