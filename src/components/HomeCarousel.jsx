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
            className="h-fit"
        >
            <CarouselContent >
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
    const [movieFullData, setMovieFullData] = useState(i);

    const fetchFullMovieData = async (id) => {
        const result = await axios.get(
            `https://www.omdbapi.com/?apikey=9e86699a&i=${id}`
        );
        return result.data;
    };
    useEffect(() => {
        // setMovieFullData(async () => await fetchFullMovieData());
        async function run() {
            let data = await fetchFullMovieData(movie.imdbID);
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

let i = {
    Title: "The Wolverine",
    Year: "2013",
    Rated: "PG-13",
    Released: "26 Jul 2013",
    Runtime: "126 min",
    Genre: "Action, Sci-Fi",
    Director: "James Mangold",
    Writer: "Mark Bomback, Scott Frank",
    Actors: "Hugh Jackman, Will Yun Lee, Tao Okamoto",
    Plot: "Wolverine comes to Japan to meet an old friend whose life he saved years ago, and gets embroiled in a conspiracy involving yakuza and mutants.",
    Language: "English, Japanese",
    Country: "United States, United Kingdom",
    Awards: "2 wins & 11 nominations total",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BNzg1MDQxMTQ2OF5BMl5BanBnXkFtZTcwMTk3MjAzOQ@@._V1_SX300.jpg",
    Ratings: [
        {
            Source: "Internet Movie Database",
            Value: "6.7/10",
        },
        {
            Source: "Rotten Tomatoes",
            Value: "71%",
        },
        {
            Source: "Metacritic",
            Value: "61/100",
        },
    ],
    Metascore: "61",
    imdbRating: "6.7",
    imdbVotes: "506,329",
    imdbID: "tt1430132",
    Type: "movie",
    DVD: "N/A",
    BoxOffice: "$132,556,852",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
};
