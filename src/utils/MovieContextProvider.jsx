import { createContext, useState, useEffect } from "react";
import {
    toggleFavoriteDB,
    loadFavoriteMovieDB,
    clearAwayMovieDB,
} from "./PersistentStorage";
import { toast } from "sonner";
import axios from "axios";
import config from "../../config";

export const MovieContext = createContext(null);

export default function MovieContextProvider({ children }) {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [favoriteMovie, setFavoriteMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const run = async () => {
            await getTrendingMovie(1);
            await updateFavoriteMovieState();
        };
        run();
    }, []);

    async function getTrendingMovie(page = 1, limit = 12) {
        setIsLoading(() => true);
        try {
            const data = await fetchIt(`/movies/popular`, {
                params: { page, limit },
            });
            if (data) {
                const summarizedData = await Promise.all(
                    data.map((movie) => getMovieSummary(movie.ids.imdb))
                );
                setTrendingMovies(summarizedData);
                setIsLoading(() => false);
                return summarizedData;
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            setIsLoading(() => false);
            return [];
        }
    }

    async function fetchIt(url, options) {
        try {
            const response = await axios.get(`${config.API_1}${url}`, {
                ...options,
                headers: {
                    "trakt-api-version": "2",
                    "trakt-api-key": config.API_1_API_KEY,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error("Error fetching data", `<span>${error.message}</span>`);
            return [];
        }
    }

    async function getTrendingMovieCarousel() {
        return getTrendingMovieCarouselPlaceHolder;
    }

    async function updateFavoriteMovieState() {
        const run = async () => {
            const favoriteMovieList = await getFavoriteList(
                await loadFavoriteMovieDB()
            );
            setFavoriteMovie(favoriteMovieList);
        };
        run();
    }

    async function getFavoriteList() {
        const favoriteMovieDBList = await loadFavoriteMovieDB();

        const FavoriteList = [];
        for (const movieID of favoriteMovieDBList) {
            const movieSummary = await getMovieSummary(movieID);
            FavoriteList.push(movieSummary);
        }

        setFavoriteMovie(() => FavoriteList);
        return FavoriteList;
    }

    async function isFavorite(id) {
        return loadFavoriteMovieDB().includes(id);
    }

    async function toggleFavorite(id) {
        const toggled = toggleFavoriteDB(id);
        updateFavoriteMovieState();
        return toggled;
    }

    async function searchMedia(option = "title", searchInput) {
        setIsLoading(() => true);
        try {
            let data = await fetchIt(`/search`, {
                params: {
                    type: "movie",
                    certifications: "pg-13",
                    query: searchInput ? searchInput : "tron legacy",
                },
            });
            console.log(" Before filtering movie", data);
            data = data.filter((movie) => movie.type === "movie");
            // data = data.filter(movie => movie.certification === "PG-13"); // TODO: Doesn't work
            console.log(" after filtering movie", data);

            if (data) {
                const summarizedData = await Promise.all(
                    data.map((movie) => getMovieSummary(movie.movie.ids.imdb))
                );
                setTrendingMovies(summarizedData);
                setIsLoading(() => false);
                return summarizedData.filter((movie) => !(movie.Response === "False"));
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            setIsLoading(() => false);
            toast.error("Error fetching data", `<span>${error.message}</span>`);
            return [];
        }
    }

    async function doClearAwayMovieDB() {
        await clearAwayMovieDB();
        await setFavoriteMovie([]);
        const promise = () =>
            new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Favorite List" }), 2000)
            );

        toast.promise(promise, {
            loading: "Loading...",
            success: (data) => {
                return `${data.name} toast has been Cleared`;
            },
            error: "Error",
        });
    }
    return (
        <MovieContext.Provider
            value={{
                trendingMovies,
                getTrendingMovie,
                getTrendingMovieCarousel,
                isFavorite,
                toggleFavorite,
                favoriteMovie,
                getMovieSummary,
                failedFetchPlaceHolder,
                feedLoading: isLoading,
                searchMedia,
                doClearAwayMovieDB,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}

async function getMovieSummary(id, options = {}) {
    const data = await axios
        .get(`https://www.omdbapi.com/?&apikey=9e86699a&i=${id}`, {
            ...options,
        })
        .then((result) => result.data)
        .catch((error) => {
            toast(
                "An Error occured While trying to fetch movie summary",
                `<span class="text-red-600">${error?.message}</span>`
            );
            return false;
        });
    return data ? data : failedFetchPlaceHolder;
}

const getTrendingMovieCarouselPlaceHolder = [
    {
        title: "300",
        Poster: "/300.jpg",
        year: 2006,
        ids: {
            trakt: 1,
            slug: "300-2006",
            imdb: "tt0416449",
            tmdb: 124,
        },
        imdbID: "tt0416449",
    },
    {
        title: "Batman Begins",
        Poster: "/batman-begins.jpg",
        year: 2005,
        ids: {
            trakt: 2,
            slug: "batman-begins-2005",
            imdb: "tt0372784",
            tmdb: 272,
        },
        imdbID: "tt0372784",
    },
    {
        title: "Prometheus",
        Poster: "/Prometeus.jpg",
        year: 2012,
        ids: {
            trakt: 3,
            slug: "prometheus-2012",
            imdb: "tt1446714",
            tmdb: 1892,
        },
        imdbID: "tt1446714",
    },
    {
        title: "Inception",
        Poster: "/The-Inception.jpg",
        year: 2010,
        ids: {
            trakt: 4,
            slug: "inception-2010",
            imdb: "tt1375666",
            tmdb: 27205,
        },
        imdbID: "tt1375666",
    },
    {
        title: "The Wolverine",
        Poster: "/The-Wolverine.jpg",
        year: 2013,
        ids: {
            trakt: 5,
            slug: "the-wolverine-2013",
            imdb: "tt1430132",
            tmdb: 14526,
        },
        imdbID: "tt1430132",
    },
];

const failedFetchPlaceHolder = {
    Title: "--",
    Year: "--",
    Rated: "--",
    Released: "--",
    Runtime: "--",
    Genre: "--",
    Director: "--",
    Writer: "--",
    Actors: "--",
    Plot: "--",
    Language: "--",
    Country: "--",
    Awards: "--",
    Poster: "https://placehold.co/300x500/png?text=Couldn%27t+load+image",
    Ratings: [
        {
            Source: "--",
            Value: "--",
        },
        {
            Source: "--",
            Value: "--",
        },
        {
            Source: "--",
            Value: "--",
        },
    ],
    Metascore: "--",
    imdbRating: "--",
    imdbVotes: "--",
    imdbID: "--",
    Type: "--",
    DVD: "--",
    BoxOffice: "--",
    Production: "--",
    Website: "--",
    Response: "--",
};
